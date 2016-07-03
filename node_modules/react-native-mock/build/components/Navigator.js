var _react=require('react');var _react2=_interopRequireDefault(_react);
var _createMockComponent=require('./createMockComponent');var _createMockComponent2=_interopRequireDefault(_createMockComponent);
var _View=require('./View');var _View2=_interopRequireDefault(_View);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var NavigatorSceneConfigType=_react.PropTypes.shape({
gestures:_react.PropTypes.object,
springFriction:_react.PropTypes.number,
springTension:_react.PropTypes.number,
defaultTransitionVelocity:_react.PropTypes.number,
animationInterpolators:_react2['default'].PropTypes.object});


var NavigatorSceneConfigs={
PushFromRight:NavigatorSceneConfigType,
FloatFromRight:NavigatorSceneConfigType,
FloatFromLeft:NavigatorSceneConfigType,
FloatFromBottom:NavigatorSceneConfigType,
FloatFromBottomAndroid:NavigatorSceneConfigType,
FadeAndroid:NavigatorSceneConfigType,
HorizontalSwipeJump:NavigatorSceneConfigType,
HorizontalSwipeJumpFromRight:NavigatorSceneConfigType,
VerticalUpSwipeJump:NavigatorSceneConfigType,
VerticalDownSwipeJump:NavigatorSceneConfigType};


var Navigator=_react2['default'].createClass({displayName:'Navigator',
propTypes:{
/**
     * Optional function that allows configuration about scene animations and
     * gestures. Will be invoked with the route and the routeStack and should
     * return a scene configuration object
     *
     * ```
     * (route, routeStack) => Navigator.SceneConfigs.FloatFromRight
     * ```
     */
configureScene:_react.PropTypes.func,

/**
     * Required function which renders the scene for a given route. Will be
     * invoked with the route and the navigator object
     *
     * ```
     * (route, navigator) =>
     *   <MySceneComponent title={route.title} navigator={navigator} />
     * ```
     */
renderScene:_react.PropTypes.func.isRequired,

/**
     * Specify a route to start on. A route is an object that the navigator
     * will use to identify each scene to render. `initialRoute` must be
     * a route in the `initialRouteStack` if both props are provided. The
     * `initialRoute` will default to the last item in the `initialRouteStack`.
     */
initialRoute:_react.PropTypes.object,

/**
     * Provide a set of routes to initially mount. Required if no initialRoute
     * is provided. Otherwise, it will default to an array containing only the
     * `initialRoute`
     */
initialRouteStack:_react.PropTypes.arrayOf(_react.PropTypes.object),

/**
     * Will emit the target route upon mounting and before each nav transition
     */
onWillFocus:_react.PropTypes.func,

/**
     * Will be called with the new route of each scene after the transition is
     * complete or after the initial mounting
     */
onDidFocus:_react.PropTypes.func,

/**
     * Optionally provide a navigation bar that persists across scene
     * transitions
     */
navigationBar:_react.PropTypes.node,

/**
     * Optionally provide the navigator object from a parent Navigator
     */
navigator:_react.PropTypes.object,

/**
     * Styles to apply to the container of each scene
     */
sceneStyle:_View2['default'].propTypes.style},


statics:{
BreadcrumbNavigationBar:(0,_createMockComponent2['default'])('NavigatorBreadcrumbNavigationBar'),
NavigationBar:(0,_createMockComponent2['default'])('NavigatorNavigationBar'),
SceneConfigs:NavigatorSceneConfigs},

render:function(){function render(){
return null;}return render;}()});



module.exports=Navigator;