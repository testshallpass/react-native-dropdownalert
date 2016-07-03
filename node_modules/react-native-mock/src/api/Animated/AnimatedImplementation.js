import invariant from 'invariant';
import Interpolation from './Interpolation';
import Easing from './Easing';
import InteractionManager from '../InteractionManager';
import SpringConfig from './SpringConfig';
import requestAnimationFrame from 'raf';
import flattenStyle from '../../propTypes/flattenStyle';

class Animated {
  __attach() {}
  __detach() {}
  __getValue() {}
  __getAnimatedValue() { return this.__getValue(); }
  __addChild(child) {}
  __removeChild(child) {}
  __getChildren() { return []; }
}

class Animation {
  start(fromValue, onUpdate, onEnd, previousAnimation) {}
  stop() {}
  __debouncedOnEnd(result) {
    const onEnd = this.__onEnd;
    this.__onEnd = null;
    if (onEnd) {
      onEnd(result);
    }
  }
}

class AnimatedWithChildren extends Animated {
  constructor() {
    super();
    this._children = [];
  }

  __addChild(child) {
    if (this._children.length === 0) {
      this.__attach();
    }
    this._children.push(child);
  }

  __removeChild(child) {
    const index = this._children.indexOf(child);
    if (index === -1) {
      console.warn(
        'Trying to remove a child that doesn\'t exist'
      );
      return;
    }
    this._children.splice(index, 1);
    if (this._children.length === 0) {
      this.__detach();
    }
  }

  __getChildren() {
    return this._children;
  }
}

/**
 * Animated works by building a directed acyclic graph of dependencies
 * transparently when you render your Animated components.
 *
 *               new Animated.Value(0)
 *     .interpolate()        .interpolate()    new Animated.Value(1)
 *         opacity               translateY      scale
 *          style                         transform
 *         View#234                         style
 *                                         View#123
 *
 * A) Top Down phase
 * When an Animated.Value is updated, we recursively go down through this
 * graph in order to find leaf nodes: the views that we flag as needing
 * an update.
 *
 * B) Bottom Up phase
 * When a view is flagged as needing an update, we recursively go back up
 * in order to build the new value that it needs. The reason why we need
 * this two-phases process is to deal with composite props such as
 * transform which can receive values from multiple parents.
 */
function _flush(rootNode) {
  const animatedStyles = new Set();
  function findAnimatedStyles(node) {
    if (typeof node.update === 'function') {
      animatedStyles.add(node);
    } else {
      node.__getChildren().forEach(findAnimatedStyles);
    }
  }
  findAnimatedStyles(rootNode);
  animatedStyles.forEach(animatedStyle => animatedStyle.update());
}

const easeInOut = Easing.inOut(Easing.ease);

class TimingAnimation extends Animation {
  constructor(config) {
    super();
    this._toValue = config.toValue;
    this._easing = config.easing || easeInOut;
    this._duration = config.duration !== undefined ? config.duration : 500;
    this._delay = config.delay || 0;
    this.__isInteraction = config.isInteraction !== undefined ? config.isInteraction : true;
  }

  start(fromValue, onUpdate, onEnd) {
    this.__active = true;
    this._fromValue = fromValue;
    this._onUpdate = onUpdate;
    this.__onEnd = onEnd;

    const start = () => {
      if (this._duration === 0) {
        this._onUpdate(this._toValue);
        this.__debouncedOnEnd({ finished: true });
      } else {
        this._startTime = Date.now();
        this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
      }
    };
    if (this._delay) {
      this._timeout = setTimeout(start, this._delay);
    } else {
      start();
    }
  }

  onUpdate() {
    const now = Date.now();
    if (now >= this._startTime + this._duration) {
      if (this._duration === 0) {
        this._onUpdate(this._toValue);
      } else {
        this._onUpdate(
          this._fromValue + this._easing(1) * (this._toValue - this._fromValue)
        );
      }
      this.__debouncedOnEnd({ finished: true });
      return;
    }

    this._onUpdate(
      this._fromValue +
      this._easing((now - this._startTime) / this._duration) *
      (this._toValue - this._fromValue)
    );
    if (this.__active) {
      this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
    }
  }

  stop() {
    this.__active = false;
    clearTimeout(this._timeout);
    window.cancelAnimationFrame(this._animationFrame);
    this.__debouncedOnEnd({ finished: false });
  }
}

class DecayAnimation extends Animation {
  constructor(config) {
    super();
    this._deceleration = config.deceleration || 0.998;
    this._velocity = config.velocity;
    this.__isInteraction = config.isInteraction !== undefined ? config.isInteraction : true;
  }

  start(fromValue, onUpdate, onEnd) {
    this.__active = true;
    this._lastValue = fromValue;
    this._fromValue = fromValue;
    this._onUpdate = onUpdate;
    this.__onEnd = onEnd;
    this._startTime = Date.now();
    this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
  }

  onUpdate() {
    const now = Date.now();

    const value = this._fromValue +
      (this._velocity / (1 - this._deceleration)) *
      (1 - Math.exp(-(1 - this._deceleration) * (now - this._startTime)));

    this._onUpdate(value);

    if (Math.abs(this._lastValue - value) < 0.1) {
      this.__debouncedOnEnd({ finished: true });
      return;
    }

    this._lastValue = value;
    if (this.__active) {
      this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
    }
  }

  stop() {
    this.__active = false;
    window.cancelAnimationFrame(this._animationFrame);
    this.__debouncedOnEnd({ finished: false });
  }
}

function withDefault(value, defaultValue) {
  if (value === undefined || value === null) {
    return defaultValue;
  }
  return value;
}

class SpringAnimation extends Animation {
  constructor(config) {
    super();

    this._overshootClamping = withDefault(config.overshootClamping, false);
    this._restDisplacementThreshold = withDefault(config.restDisplacementThreshold, 0.001);
    this._restSpeedThreshold = withDefault(config.restSpeedThreshold, 0.001);
    this._initialVelocity = config.velocity;
    this._lastVelocity = withDefault(config.velocity, 0);
    this._toValue = config.toValue;
    this.__isInteraction = config.isInteraction !== undefined ? config.isInteraction : true;

    let springConfig;
    if (config.bounciness !== undefined || config.speed !== undefined) {
      invariant(
        config.tension === undefined && config.friction === undefined,
        'You can only define bounciness/speed or tension/friction but not both'
      );
      springConfig = SpringConfig.fromBouncinessAndSpeed(
        withDefault(config.bounciness, 8),
        withDefault(config.speed, 12),
      );
    } else {
      springConfig = SpringConfig.fromOrigamiTensionAndFriction(
        withDefault(config.tension, 40),
        withDefault(config.friction, 7),
      );
    }
    this._tension = springConfig.tension;
    this._friction = springConfig.friction;
  }

  start(fromValue, onUpdate, onEnd, previousAnimation) {
    this.__active = true;
    this._startPosition = fromValue;
    this._lastPosition = this._startPosition;

    this._onUpdate = onUpdate;
    this.__onEnd = onEnd;
    this._lastTime = Date.now();

    if (previousAnimation instanceof SpringAnimation) {
      const internalState = previousAnimation.getInternalState();
      this._lastPosition = internalState.lastPosition;
      this._lastVelocity = internalState.lastVelocity;
      this._lastTime = internalState.lastTime;
    }
    if (this._initialVelocity !== undefined && this._initialVelocity !== null) {
      this._lastVelocity = this._initialVelocity;
    }
    this.onUpdate();
  }

  getInternalState() {
    return {
      lastPosition: this._lastPosition,
      lastVelocity: this._lastVelocity,
      lastTime: this._lastTime,
    };
  }

  onUpdate() {
    let position = this._lastPosition;
    let velocity = this._lastVelocity;

    let tempPosition = this._lastPosition;
    let tempVelocity = this._lastVelocity;

    // If for some reason we lost a lot of frames (e.g. process large payload or
    // stopped in the debugger), we only advance by 4 frames worth of
    // computation and will continue on the next frame. It's better to have it
    // running at faster speed than jumping to the end.
    const MAX_STEPS = 64;
    let now = Date.now();
    if (now > this._lastTime + MAX_STEPS) {
      now = this._lastTime + MAX_STEPS;
    }

    // We are using a fixed time step and a maximum number of iterations.
    // The following post provides a lot of thoughts into how to build this
    // loop: http://gafferongames.com/game-physics/fix-your-timestep/
    const TIMESTEP_MSEC = 1;
    const numSteps = Math.floor((now - this._lastTime) / TIMESTEP_MSEC);

    for (let i = 0; i < numSteps; ++i) {
      // Velocity is based on seconds instead of milliseconds
      const step = TIMESTEP_MSEC / 1000;

      // This is using RK4. A good blog post to understand how it works:
      // http://gafferongames.com/game-physics/integration-basics/
      const aVelocity = velocity;
      const aAcceleration =
        this._tension * (this._toValue - tempPosition) - this._friction * tempVelocity;
      tempPosition = position + aVelocity * step / 2;
      tempVelocity = velocity + aAcceleration * step / 2;

      const bVelocity = tempVelocity;
      const bAcceleration =
        this._tension * (this._toValue - tempPosition) - this._friction * tempVelocity;
      tempPosition = position + bVelocity * step / 2;
      tempVelocity = velocity + bAcceleration * step / 2;

      const cVelocity = tempVelocity;
      const cAcceleration =
        this._tension * (this._toValue - tempPosition) - this._friction * tempVelocity;
      tempPosition = position + cVelocity * step / 2;
      tempVelocity = velocity + cAcceleration * step / 2;

      const dVelocity = tempVelocity;
      const dAcceleration =
        this._tension * (this._toValue - tempPosition) - this._friction * tempVelocity;
      tempPosition = position + cVelocity * step / 2;
      tempVelocity = velocity + cAcceleration * step / 2;

      const dxdt = (aVelocity + 2 * (bVelocity + cVelocity) + dVelocity) / 6;
      const dvdt = (aAcceleration + 2 * (bAcceleration + cAcceleration) + dAcceleration) / 6;

      position += dxdt * step;
      velocity += dvdt * step;
    }

    this._lastTime = now;
    this._lastPosition = position;
    this._lastVelocity = velocity;

    this._onUpdate(position);
    if (!this.__active) { // a listener might have stopped us in _onUpdate
      return;
    }

    // Conditions for stopping the spring animation
    let isOvershooting = false;
    if (this._overshootClamping && this._tension !== 0) {
      if (this._startPosition < this._toValue) {
        isOvershooting = position > this._toValue;
      } else {
        isOvershooting = position < this._toValue;
      }
    }

    const isVelocity = Math.abs(velocity) <= this._restSpeedThreshold;
    let isDisplacement = true;
    if (this._tension !== 0) {
      isDisplacement = Math.abs(this._toValue - position) <= this._restDisplacementThreshold;
    }

    if (isOvershooting || (isVelocity && isDisplacement)) {
      if (this._tension !== 0) {
        // Ensure that we end up with a round value
        this._onUpdate(this._toValue);
      }

      this.__debouncedOnEnd({ finished: true });
      return;
    }
    this._animationFrame = requestAnimationFrame(this.onUpdate.bind(this));
  }

  stop() {
    this.__active = false;
    window.cancelAnimationFrame(this._animationFrame);
    this.__debouncedOnEnd({ finished: false });
  }
}

let _uniqueId = 1;

class AnimatedInterpolation extends AnimatedWithChildren {
  constructor(parent, interpolation) {
    super();
    this._parent = parent;
    this._interpolation = interpolation;
  }

  __getValue() {
    const parentValue = this._parent.__getValue();
    invariant(
      typeof parentValue === 'number',
      'Cannot interpolate an input which is not a number.'
    );
    return this._interpolation(parentValue);
  }

  interpolate(config) {
    return new AnimatedInterpolation(this, Interpolation.create(config));
  }

  __attach() {
    this._parent.__addChild(this);
  }

  __detach() {
    this._parent.__removeChild(this);
  }
}


class AnimatedValue extends AnimatedWithChildren {
  constructor(value) {
    super();
    this._value = value;
    this._offset = 0;
    this._animation = null;
    this._listeners = {};
  }

  __detach() {
    this.stopAnimation();
  }

  __getValue() {
    return this._value + this._offset;
  }

  /**
   * Directly set the value.  This will stop any animations running on the value
   * and update all the bound properties.
   */
  setValue(value) {
    if (this._animation) {
      this._animation.stop();
      this._animation = null;
    }
    this._updateValue(value);
  }

  /**
   * Sets an offset that is applied on top of whatever value is set, whether via
   * `setValue`, an animation, or `Animated.event`.  Useful for compensating
   * things like the start of a pan gesture.
   */
  setOffset(offset) {
    this._offset = offset;
  }

  /**
   * Merges the offset value into the base value and resets the offset to zero.
   * The final output of the value is unchanged.
   */
  flattenOffset() {
    this._value += this._offset;
    this._offset = 0;
  }

  /**
   * Adds an asynchronous listener to the value so you can observe updates from
   * animations.  This is useful because there is no way to
   * synchronously read the value because it might be driven natively.
   */
  addListener(callback) {
    const id = String(_uniqueId++);
    this._listeners[id] = callback;
    return id;
  }

  removeListener(id) {
    delete this._listeners[id];
  }

  removeAllListeners() {
    this._listeners = {};
  }

  /**
   * Stops any running animation or tracking.  `callback` is invoked with the
   * final value after stopping the animation, which is useful for updating
   * state to match the animation position with layout.
   */
  stopAnimation(callback) {
    this.stopTracking();
    if (this._animation) {
      this._animation.stop();
    }
    this._animation = null;
    if (callback) {
      callback(this.__getValue());
    }
  }

  /**
   * Interpolates the value before updating the property, e.g. mapping 0-1 to
   * 0-10.
   */
  interpolate(config) {
    return new AnimatedInterpolation(this, Interpolation.create(config));
  }

  /**
   * Typically only used internally, but could be used by a custom Animation
   * class.
   */
  animate(animation, callback) {
    let handle = null;
    if (animation.__isInteraction) {
      handle = InteractionManager.createInteractionHandle();
    }
    const previousAnimation = this._animation;
    if (this._animation) {
      this._animation.stop();
    }
    this._animation = animation;
    animation.start(
      this._value,
      (value) => {
        this._updateValue(value);
      },
      (result) => {
        this._animation = null;
        if (handle !== null) {
          InteractionManager.clearInteractionHandle(handle);
        }
        if (callback) {
          callback(result);
        }
      },
      previousAnimation
    );
  }

  /**
   * Typically only used internally.
   */
  stopTracking() {
    if (this._tracking) {
      this._tracking.__detach();
    }
    this._tracking = null;
  }

  /**
   * Typically only used internally.
   */
  track(tracking) {
    this.stopTracking();
    this._tracking = tracking;
  }

  _updateValue(value) {
    this._value = value;
    _flush(this);
    for (const key in this._listeners) {
      this._listeners[key]({ value: this.__getValue() });
    }
  }
}


class AnimatedValueXY extends AnimatedWithChildren {
  constructor(valueIn) {
    super();
    const value = valueIn || { x: 0, y: 0 };  // @flowfixme: shouldn't need `: any`
    if (typeof value.x === 'number' && typeof value.y === 'number') {
      this.x = new AnimatedValue(value.x);
      this.y = new AnimatedValue(value.y);
    } else {
      invariant(
        value.x instanceof AnimatedValue &&
        value.y instanceof AnimatedValue,
        'AnimatedValueXY must be initalized with an object of numbers or ' +
        'AnimatedValues.'
      );
      this.x = value.x;
      this.y = value.y;
    }
    this._listeners = {};
  }

  setValue(value) {
    this.x.setValue(value.x);
    this.y.setValue(value.y);
  }

  setOffset(offset) {
    this.x.setOffset(offset.x);
    this.y.setOffset(offset.y);
  }

  flattenOffset() {
    this.x.flattenOffset();
    this.y.flattenOffset();
  }

  __getValue() {
    return {
      x: this.x.__getValue(),
      y: this.y.__getValue(),
    };
  }

  stopAnimation(callback) {
    this.x.stopAnimation();
    this.y.stopAnimation();
    if (callback) {
      callback(this.__getValue());
    }
  }

  addListener(callback) {
    const id = String(_uniqueId++);
    const jointCallback = ({ value }) => {
      callback(this.__getValue());
    };
    this._listeners[id] = {
      x: this.x.addListener(jointCallback),
      y: this.y.addListener(jointCallback),
    };
    return id;
  }

  removeListener(id) {
    this.x.removeListener(this._listeners[id].x);
    this.y.removeListener(this._listeners[id].y);
    delete this._listeners[id];
  }

  /**
   * Converts `{x, y}` into `{left, top}` for use in style, e.g.
   *
   *```javascript
   *  style={this.state.anim.getLayout()}
   *```
   */
  getLayout() {
    return {
      left: this.x,
      top: this.y,
    };
  }

  /**
   * Converts `{x, y}` into a useable translation transform, e.g.
   *
   *```javascript
   *  style={{
     *    transform: this.state.anim.getTranslateTransform()
     *  }}
   *```
   */
  getTranslateTransform() {
    return [
      { translateX: this.x },
      { translateY: this.y }
    ];
  }
}


class AnimatedAddition extends AnimatedWithChildren {
  constructor(a, b) {
    super();
    this._a = a;
    this._b = b;
  }

  __getValue() {
    return this._a.__getValue() + this._b.__getValue();
  }

  interpolate(config) {
    return new AnimatedInterpolation(this, Interpolation.create(config));
  }

  __attach() {
    this._a.__addChild(this);
    this._b.__addChild(this);
  }

  __detach() {
    this._a.__removeChild(this);
    this._b.__removeChild(this);
  }
}

class AnimatedMultiplication extends AnimatedWithChildren {
  constructor(a, b) {
    super();
    this._a = a;
    this._b = b;
  }

  __getValue() {
    return this._a.__getValue() * this._b.__getValue();
  }

  interpolate(config) {
    return new AnimatedInterpolation(this, Interpolation.create(config));
  }

  __attach() {
    this._a.__addChild(this);
    this._b.__addChild(this);
  }

  __detach() {
    this._a.__removeChild(this);
    this._b.__removeChild(this);
  }
}

class AnimatedTransform extends AnimatedWithChildren {
  constructor(transforms) {
    super();
    this._transforms = transforms;
  }

  __getValue() {
    return this._transforms.map(transform => {
      const result = {};
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof Animated) {
          result[key] = value.__getValue();
        } else {
          result[key] = value;
        }
      }
      return result;
    });
  }

  __getAnimatedValue() {
    return this._transforms.map(transform => {
      const result = {};
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof Animated) {
          result[key] = value.__getAnimatedValue();
        } else {
          // All transform components needed to recompose matrix
          result[key] = value;
        }
      }
      return result;
    });
  }

  __attach() {
    this._transforms.forEach(transform => {
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof Animated) {
          value.__addChild(this);
        }
      }
    });
  }

  __detach() {
    this._transforms.forEach(transform => {
      for (const key in transform) {
        const value = transform[key];
        if (value instanceof Animated) {
          value.__removeChild(this);
        }
      }
    });
  }
}

class AnimatedStyle extends AnimatedWithChildren {
  constructor(style) {
    super();
    let newStyle;
    newStyle = flattenStyle(style) || {};
    if (newStyle.transform) {
      newStyle = {
        ...newStyle,
        transform: new AnimatedTransform(newStyle.transform),
      };
    }
    this._style = newStyle;
  }

  __getValue() {
    const style = {};
    for (const key in this._style) {
      const value = this._style[key];
      if (value instanceof Animated) {
        style[key] = value.__getValue();
      } else {
        style[key] = value;
      }
    }
    return style;
  }

  __getAnimatedValue() {
    const style = {};
    for (const key in this._style) {
      const value = this._style[key];
      if (value instanceof Animated) {
        style[key] = value.__getAnimatedValue();
      }
    }
    return style;
  }

  __attach() {
    for (const key in this._style) {
      const value = this._style[key];
      if (value instanceof Animated) {
        value.__addChild(this);
      }
    }
  }

  __detach() {
    for (const key in this._style) {
      const value = this._style[key];
      if (value instanceof Animated) {
        value.__removeChild(this);
      }
    }
  }
}

class AnimatedProps extends Animated {
  constructor(props, callback) {
    super();
    this._props = props;
    if (this._props.style) {
      this._props = {
        ...this._props,
        style: new AnimatedStyle(this._props.style),
      };
    }
    this._callback = callback;
    this.__attach();
  }

  __getValue() {
    const props = {};
    for (const key in this._props) {
      const value = this._props[key];
      if (value instanceof Animated) {
        props[key] = value.__getValue();
      } else {
        props[key] = value;
      }
    }
    return props;
  }

  __getAnimatedValue() {
    const props = {};
    for (const key in this._props) {
      const value = this._props[key];
      if (value instanceof Animated) {
        props[key] = value.__getAnimatedValue();
      }
    }
    return props;
  }

  __attach() {
    for (const key in this._props) {
      const value = this._props[key];
      if (value instanceof Animated) {
        value.__addChild(this);
      }
    }
  }

  __detach() {
    for (const key in this._props) {
      const value = this._props[key];
      if (value instanceof Animated) {
        value.__removeChild(this);
      }
    }
  }

  update() {
    this._callback();
  }
}

class AnimatedTracking extends Animated {
  constructor(value, parent, animationClass, animationConfig, callback) {
    super();
    this._value = value;
    this._parent = parent;
    this._animationClass = animationClass;
    this._animationConfig = animationConfig;
    this._callback = callback;
    this.__attach();
  }

  __getValue() {
    return this._parent.__getValue();
  }

  __attach() {
    this._parent.__addChild(this);
  }

  __detach() {
    this._parent.__removeChild(this);
  }

  update() {
    this._value.animate(new this._animationClass({
      ...this._animationConfig,
      toValue: this._animationConfig.toValue.__getValue(),
    }), this._callback);
  }
}

function add(a, b) {
  return new AnimatedAddition(a, b);
}

function multiply(a, b) {
  return new AnimatedMultiplication(a, b);
}

function parallel(animations, config) {
  let doneCount = 0;
  // Make sure we only call stop() at most once for each animation
  const hasEnded = {};
  const stopTogether = !(config && config.stopTogether === false);

  const result = {
    start(callback) {
      if (doneCount === animations.length) {
        if (callback) {
          callback({ finished: true });
        }
        return;
      }

      animations.forEach((animation, idx) => {
        const cb = function (endResult) {
          hasEnded[idx] = true;
          doneCount++;
          if (doneCount === animations.length) {
            doneCount = 0;
            if (callback) {
              callback(endResult);
            }
            return;
          }

          if (!endResult.finished && stopTogether) {
            result.stop();
          }
        };

        if (!animation) {
          cb({ finished: true });
        } else {
          animation.start(cb);
        }
      });
    },

    stop() {
      animations.forEach((animation, idx) => {
        if (!hasEnded[idx]) {
          animation.stop();
        }
        hasEnded[idx] = true;
      });
    }
  };

  return result;
}

function maybeVectorAnim(value, config, anim) {
  if (value instanceof AnimatedValueXY) {
    const configX = { ...config };
    const configY = { ...config };
    for (const key in config) {
      const { x, y } = config[key];
      if (x !== undefined && y !== undefined) {
        configX[key] = x;
        configY[key] = y;
      }
    }
    const aX = anim(value.x, configX);
    const aY = anim(value.y, configY);
    // We use `stopTogether: false` here because otherwise tracking will break
    // because the second animation will get stopped before it can update.
    return parallel([aX, aY], { stopTogether: false });
  }
  return null;
}

function spring(value, config) {
  return maybeVectorAnim(value, config, spring) || {
    start(callback) {
      const singleValue = value;
      const singleConfig = config;
      singleValue.stopTracking();
      if (config.toValue instanceof Animated) {
        singleValue.track(new AnimatedTracking(
          singleValue,
          config.toValue,
          SpringAnimation,
          singleConfig,
          callback
        ));
      } else {
        singleValue.animate(new SpringAnimation(singleConfig), callback);
      }
    },

    stop() {
      value.stopAnimation();
    },
  };
}

function timing(value, config) {
  return maybeVectorAnim(value, config, timing) || {
    start(callback) {
      const singleValue = value;
      const singleConfig = config;
      singleValue.stopTracking();
      if (config.toValue instanceof Animated) {
        singleValue.track(new AnimatedTracking(
          singleValue,
          config.toValue,
          TimingAnimation,
          singleConfig,
          callback
        ));
      } else {
        singleValue.animate(new TimingAnimation(singleConfig), callback);
      }
    },

    stop() {
      value.stopAnimation();
    },
  };
}

function decay(value, config) {
  return maybeVectorAnim(value, config, decay) || {
    start(callback) {
      const singleValue = value;
      const singleConfig = config;
      singleValue.stopTracking();
      singleValue.animate(new DecayAnimation(singleConfig), callback);
    },

    stop() {
      value.stopAnimation();
    },
  };
}

function sequence(animations) {
  let current = 0;
  return {
    start(callback) {
      const onComplete = function (result) {
        if (!result.finished) {
          if (callback) {
            callback(result);
          }
          return;
        }

        current++;

        if (current === animations.length) {
          if (callback) {
            callback(result);
          }
          return;
        }

        animations[current].start(onComplete);
      };

      if (animations.length === 0) {
        if (callback) {
          callback({ finished: true });
        }
      } else {
        animations[current].start(onComplete);
      }
    },

    stop() {
      if (current < animations.length) {
        animations[current].stop();
      }
    }
  };
}

function delay(time) {
  // Would be nice to make a specialized implementation
  return timing(new AnimatedValue(0), { toValue: 0, delay: time, duration: 0 });
}

function stagger(time, animations) {
  return parallel(animations.map(function (animation, i) {
    return sequence([
      delay(time * i),
      animation,
    ]);
  }));
}

function event(argMapping, config) {
  return function (...args) {
    const traverse = function (recMapping, recEvt, key) {
      if (typeof recEvt === 'number') {
        invariant(
          recMapping instanceof AnimatedValue,
          'Bad mapping of type ' + typeof recMapping + ' for key ' + key +
          ', event value must map to AnimatedValue'
        );
        recMapping.setValue(recEvt);
        return;
      }
      invariant(
        typeof recMapping === 'object',
        'Bad mapping of type ' + typeof recMapping + ' for key ' + key
      );
      invariant(
        typeof recEvt === 'object',
        'Bad event of type ' + typeof recEvt + ' for key ' + key
      );
      for (const i in recMapping) {
        traverse(recMapping[i], recEvt[i], i);
      }
    };
    argMapping.forEach((mapping, idx) => {
      traverse(mapping, args[idx], 'arg' + idx);
    });
    if (config && config.listener) {
      config.listener.apply(null, args);
    }
  };
}

const AnimatedImplementation = {
  Value: AnimatedValue,
  ValueXY: AnimatedValueXY,
  decay,
  timing,
  spring,
  add,
  multiply,
  sequence,
  parallel,
  stagger,
  event,

  __PropsOnlyForTests: AnimatedProps,
  __Animated: Animated,
  __Animation: Animation,
  __AnimatedWithChildren: AnimatedWithChildren,
  __AnimatedStyle: AnimatedStyle,
};

module.exports = AnimatedImplementation;
