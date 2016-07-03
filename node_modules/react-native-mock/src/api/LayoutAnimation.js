import React from 'react';
import UIManager from '../NativeModules/UIManager';
import keyMirror from 'keymirror';

const { PropTypes } = React;

const TypesEnum = {
  spring: true,
  linear: true,
  easeInEaseOut: true,
  easeIn: true,
  easeOut: true,
  keyboard: true,
};

const Types = keyMirror(TypesEnum);

const PropertiesEnum = {
  opacity: true,
  scaleXY: true,
};

const Properties = keyMirror(PropertiesEnum);

const animChecker = PropTypes.shape({
  duration: PropTypes.number,
  delay: PropTypes.number,
  springDamping: PropTypes.number,
  initialVelocity: PropTypes.number,
  type: PropTypes.oneOf(
    Object.keys(Types)
  ),
  property: PropTypes.oneOf( // Only applies to create/delete
    Object.keys(Properties)
  ),
});

const configChecker = PropTypes.shape({
  duration: PropTypes.number.isRequired,
  create: animChecker,
  update: animChecker,
  delete: animChecker,
});

const nop = () => {};

function configureNext(config, onAnimationDidEnd) {
  configChecker({ config }, 'config', 'LayoutAnimation.configureNext');
  UIManager.configureNextLayoutAnimation(
    config,
    onAnimationDidEnd || nop,
    nop
  );
}

function create(duration, type, creationProp) {
  return {
    duration,
    create: {
      type,
      property: creationProp,
    },
    update: {
      type,
    },
  };
}

const Presets = {
  easeInEaseOut: create(
    300, Types.easeInEaseOut, Properties.opacity
  ),
  linear: create(
    500, Types.linear, Properties.opacity
  ),
  spring: {
    duration: 700,
    create: {
      type: Types.linear,
      property: Properties.opacity,
    },
    update: {
      type: Types.spring,
      springDamping: 0.4,
    },
  },
};

const LayoutAnimation = {
  /**
   * Schedules an animation to happen on the next layout.
   *
   * @param config Specifies animation properties:
   *
   *   - `duration` in milliseconds
   *   - `create`, config for animating in new views (see `Anim` type)
   *   - `update`, config for animating views that have been updated
   * (see `Anim` type)
   *
   * @param onAnimationDidEnd Called when the animation finished.
   * Only supported on iOS.
   * @param onError Called on error. Only supported on iOS.
   */
  configureNext,
  /**
   * Helper for creating a config for `configureNext`.
   */
  create,
  Types,
  Properties,
  configChecker,
  Presets,
  easeInEaseOut: configureNext.bind(
    null, Presets.easeInEaseOut
  ),
  linear: configureNext.bind(
    null, Presets.linear
  ),
  spring: configureNext.bind(
    null, Presets.spring
  ),
};

module.exports = LayoutAnimation;
