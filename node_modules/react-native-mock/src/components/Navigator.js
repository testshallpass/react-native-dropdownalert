import React, { PropTypes } from 'react';
import createMockComponent from './createMockComponent';
import View from './View';

const NavigatorSceneConfigType = PropTypes.shape({
  gestures: PropTypes.object,
  springFriction: PropTypes.number,
  springTension: PropTypes.number,
  defaultTransitionVelocity: PropTypes.number,
  animationInterpolators: React.PropTypes.object,
});

const NavigatorSceneConfigs = {
  PushFromRight: NavigatorSceneConfigType,
  FloatFromRight: NavigatorSceneConfigType,
  FloatFromLeft: NavigatorSceneConfigType,
  FloatFromBottom: NavigatorSceneConfigType,
  FloatFromBottomAndroid: NavigatorSceneConfigType,
  FadeAndroid: NavigatorSceneConfigType,
  HorizontalSwipeJump: NavigatorSceneConfigType,
  HorizontalSwipeJumpFromRight: NavigatorSceneConfigType,
  VerticalUpSwipeJump: NavigatorSceneConfigType,
  VerticalDownSwipeJump: NavigatorSceneConfigType
};

const Navigator = React.createClass({
  propTypes: {
    /**
     * Optional function that allows configuration about scene animations and
     * gestures. Will be invoked with the route and the routeStack and should
     * return a scene configuration object
     *
     * ```
     * (route, routeStack) => Navigator.SceneConfigs.FloatFromRight
     * ```
     */
    configureScene: PropTypes.func,

    /**
     * Required function which renders the scene for a given route. Will be
     * invoked with the route and the navigator object
     *
     * ```
     * (route, navigator) =>
     *   <MySceneComponent title={route.title} navigator={navigator} />
     * ```
     */
    renderScene: PropTypes.func.isRequired,

    /**
     * Specify a route to start on. A route is an object that the navigator
     * will use to identify each scene to render. `initialRoute` must be
     * a route in the `initialRouteStack` if both props are provided. The
     * `initialRoute` will default to the last item in the `initialRouteStack`.
     */
    initialRoute: PropTypes.object,

    /**
     * Provide a set of routes to initially mount. Required if no initialRoute
     * is provided. Otherwise, it will default to an array containing only the
     * `initialRoute`
     */
    initialRouteStack: PropTypes.arrayOf(PropTypes.object),

    /**
     * Will emit the target route upon mounting and before each nav transition
     */
    onWillFocus: PropTypes.func,

    /**
     * Will be called with the new route of each scene after the transition is
     * complete or after the initial mounting
     */
    onDidFocus: PropTypes.func,

    /**
     * Optionally provide a navigation bar that persists across scene
     * transitions
     */
    navigationBar: PropTypes.node,

    /**
     * Optionally provide the navigator object from a parent Navigator
     */
    navigator: PropTypes.object,

    /**
     * Styles to apply to the container of each scene
     */
    sceneStyle: View.propTypes.style,
  },

  statics: {
    BreadcrumbNavigationBar: createMockComponent('NavigatorBreadcrumbNavigationBar'),
    NavigationBar: createMockComponent('NavigatorNavigationBar'),
    SceneConfigs: NavigatorSceneConfigs,
  },
  render() {
    return null;
  }
});

module.exports = Navigator;
