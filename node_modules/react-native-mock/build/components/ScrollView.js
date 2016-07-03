var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _react=require('react');var _react2=_interopRequireDefault(_react);
var _EdgeInsetsPropType=require('../propTypes/EdgeInsetsPropType');var _EdgeInsetsPropType2=_interopRequireDefault(_EdgeInsetsPropType);
var _PointPropType=require('../propTypes/PointPropType');var _PointPropType2=_interopRequireDefault(_PointPropType);
var _ScrollResponder=require('../mixins/ScrollResponder');var _ScrollResponder2=_interopRequireDefault(_ScrollResponder);
var _View=require('./View');var _View2=_interopRequireDefault(_View);
var _ViewStylePropTypes=require('../propTypes/ViewStylePropTypes');var _ViewStylePropTypes2=_interopRequireDefault(_ViewStylePropTypes);
var _ScrollViewManager=require('../NativeModules/ScrollViewManager');var _ScrollViewManager2=_interopRequireDefault(_ScrollViewManager);
var _StyleSheetPropType=require('../propTypes/StyleSheetPropType');var _StyleSheetPropType2=_interopRequireDefault(_StyleSheetPropType);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var 

PropTypes=_react2['default'].PropTypes;

var SCROLLVIEW='ScrollView';
var INNERVIEW='InnerScrollView';

var ScrollView=_react2['default'].createClass({displayName:'ScrollView',
propTypes:_extends({},
_View2['default'].propTypes,{
/**
     * Controls whether iOS should automatically adjust the content inset
     * for scroll views that are placed behind a navigation bar or
     * tab bar/ toolbar. The default value is true.
     * @platform ios
     */
automaticallyAdjustContentInsets:PropTypes.bool,
/**
     * The amount by which the scroll view content is inset from the edges
     * of the scroll view. Defaults to `{0, 0, 0, 0}`.
     * @platform ios
     */
contentInset:_EdgeInsetsPropType2['default'],
/**
     * Used to manually set the starting scroll offset.
     * The default value is `{x: 0, y: 0}`.
     * @platform ios
     */
contentOffset:_PointPropType2['default'],
/**
     * When true, the scroll view bounces when it reaches the end of the
     * content if the content is larger then the scroll view along the axis of
     * the scroll direction. When false, it disables all bouncing even if
     * the `alwaysBounce*` props are true. The default value is true.
     * @platform ios
     */
bounces:PropTypes.bool,
/**
     * When true, gestures can drive zoom past min/max and the zoom will animate
     * to the min/max value at gesture end, otherwise the zoom will not exceed
     * the limits.
     * @platform ios
     */
bouncesZoom:PropTypes.bool,
/**
     * When true, the scroll view bounces horizontally when it reaches the end
     * even if the content is smaller than the scroll view itself. The default
     * value is true when `horizontal={true}` and false otherwise.
     * @platform ios
     */
alwaysBounceHorizontal:PropTypes.bool,
/**
     * When true, the scroll view bounces vertically when it reaches the end
     * even if the content is smaller than the scroll view itself. The default
     * value is false when `horizontal={true}` and true otherwise.
     * @platform ios
     */
alwaysBounceVertical:PropTypes.bool,
/**
     * When true, the scroll view automatically centers the content when the
     * content is smaller than the scroll view bounds; when the content is
     * larger than the scroll view, this property has no effect. The default
     * value is false.
     * @platform ios
     */
centerContent:PropTypes.bool,
/**
     * These styles will be applied to the scroll view content container which
     * wraps all of the child views. Example:
     *
     *   return (
     *     <ScrollView contentContainerStyle={styles.contentContainer}>
     *     </ScrollView>
     *   );
     *   ...
     *   var styles = StyleSheet.create({
     *     contentContainer: {
     *       paddingVertical: 20
     *     }
     *   });
     */
contentContainerStyle:(0,_StyleSheetPropType2['default'])(_ViewStylePropTypes2['default']),
/**
     * A floating-point number that determines how quickly the scroll view
     * decelerates after the user lifts their finger. You may also use string
     * shortcuts `"normal"` and `"fast"` which match the underlying iOS settings
     * for `UIScrollViewDecelerationRateNormal` and
     * `UIScrollViewDecelerationRateFast` respectively.
     *   - Normal: 0.998 (the default)
     *   - Fast: 0.9
     * @platform ios
     */
decelerationRate:PropTypes.oneOfType([
PropTypes.oneOf(['fast','normal']),
PropTypes.number]),

/**
     * When true, the scroll view's children are arranged horizontally in a row
     * instead of vertically in a column. The default value is false.
     */
horizontal:PropTypes.bool,
/**
     * The style of the scroll indicators.
     *   - `default` (the default), same as `black`.
     *   - `black`, scroll indicator is black.
     *   - `white`, scroll indicator is white.
     * @platform ios
     */
indicatorStyle:PropTypes.oneOf([
'default', // default
'black',
'white']),

/**
     * When true, the ScrollView will try to lock to only vertical or horizontal
     * scrolling while dragging.  The default value is false.
     * @platform ios
     */
directionalLockEnabled:PropTypes.bool,
/**
     * When false, once tracking starts, won't try to drag if the touch moves.
     * The default value is true.
     * @platform ios
     */
canCancelContentTouches:PropTypes.bool,
/**
     * Determines whether the keyboard gets dismissed in response to a drag.
     *   - 'none' (the default), drags do not dismiss the keyboard.
     *   - 'on-drag', the keyboard is dismissed when a drag begins.
     *   - 'interactive', the keyboard is dismissed interactively with the drag and moves in
     *     synchrony with the touch; dragging upwards cancels the dismissal.
     *     On android this is not supported and it will have the same behavior as 'none'.
     */
keyboardDismissMode:PropTypes.oneOf([
'none', // default
'interactive',
'on-drag']),

/**
     * When false, tapping outside of the focused text input when the keyboard
     * is up dismisses the keyboard. When true, the scroll view will not catch
     * taps, and the keyboard will not dismiss automatically. The default value
     * is false.
     */
keyboardShouldPersistTaps:PropTypes.bool,
/**
     * The maximum allowed zoom scale. The default value is 1.0.
     * @platform ios
     */
maximumZoomScale:PropTypes.number,
/**
     * The minimum allowed zoom scale. The default value is 1.0.
     * @platform ios
     */
minimumZoomScale:PropTypes.number,
/**
     * Fires at most once per frame during scrolling. The frequency of the
     * events can be controlled using the `scrollEventThrottle` prop.
     */
onScroll:PropTypes.func,
/**
     * Called when a scrolling animation ends.
     * @platform ios
     */
onScrollAnimationEnd:PropTypes.func,
/**
     * Called when scrollable content view of the ScrollView changes. It's
     * implemented using onLayout handler attached to the content container
     * which this ScrollView renders.
     */
onContentSizeChange:PropTypes.func,
/**
     * When true, the scroll view stops on multiples of the scroll view's size
     * when scrolling. This can be used for horizontal pagination. The default
     * value is false.
     * @platform ios
     */
pagingEnabled:PropTypes.bool,
/**
     * When false, the content does not scroll.
     * The default value is true.
     * @platform ios
     */
scrollEnabled:PropTypes.bool,
/**
     * This controls how often the scroll event will be fired while scrolling
     * (in events per seconds). A higher number yields better accuracy for code
     * that is tracking the scroll position, but can lead to scroll performance
     * problems due to the volume of information being send over the bridge.
     * The default value is zero, which means the scroll event will be sent
     * only once each time the view is scrolled.
     * @platform ios
     */
scrollEventThrottle:PropTypes.number,
/**
     * The amount by which the scroll view indicators are inset from the edges
     * of the scroll view. This should normally be set to the same value as
     * the `contentInset`. Defaults to `{0, 0, 0, 0}`.
     * @platform ios
     */
scrollIndicatorInsets:_EdgeInsetsPropType2['default'],
/**
     * When true, the scroll view scrolls to top when the status bar is tapped.
     * The default value is true.
     * @platform ios
     */
scrollsToTop:PropTypes.bool,
/**
     * When true, momentum events will be sent from Android
     * This is internal and set automatically by the framework if you have
     * onMomentumScrollBegin or onMomentumScrollEnd set on your ScrollView
     * @platform android
     */
sendMomentumEvents:PropTypes.bool,
/**
     * When true, shows a horizontal scroll indicator.
     */
showsHorizontalScrollIndicator:PropTypes.bool,
/**
     * When true, shows a vertical scroll indicator.
     */
showsVerticalScrollIndicator:PropTypes.bool,
/**
     * An array of child indices determining which children get docked to the
     * top of the screen when scrolling. For example, passing
     * `stickyHeaderIndices={[0]}` will cause the first child to be fixed to the
     * top of the scroll view. This property is not supported in conjunction
     * with `horizontal={true}`.
     * @platform ios
     */
stickyHeaderIndices:PropTypes.arrayOf(PropTypes.number),
style:(0,_StyleSheetPropType2['default'])(_ViewStylePropTypes2['default']),
/**
     * When set, causes the scroll view to stop at multiples of the value of
     * `snapToInterval`. This can be used for paginating through children
     * that have lengths smaller than the scroll view. Used in combination
     * with `snapToAlignment`.
     * @platform ios
     */
snapToInterval:PropTypes.number,
/**
     * When `snapToInterval` is set, `snapToAlignment` will define the relationship
     * of the the snapping to the scroll view.
     *   - `start` (the default) will align the snap at the left (horizontal) or top (vertical)
     *   - `center` will align the snap in the center
     *   - `end` will align the snap at the right (horizontal) or bottom (vertical)
     * @platform ios
     */
snapToAlignment:PropTypes.oneOf([
'start', // default
'center',
'end']),

/**
     * Experimental: When true, offscreen child views (whose `overflow` value is
     * `hidden`) are removed from their native backing superview when offscreen.
     * This can improve scrolling performance on long lists. The default value is
     * true.
     */
removeClippedSubviews:PropTypes.bool,
/**
     * The current scale of the scroll view content. The default value is 1.0.
     * @platform ios
     */
zoomScale:PropTypes.number,

/**
     * A RefreshControl component, used to provide pull-to-refresh
     * functionality for the ScrollView.
     *
     * See [RefreshControl](http://facebook.github.io/react-native/docs/refreshcontrol.html).
     */
refreshControl:PropTypes.element}),


mixins:[_ScrollResponder2['default'].Mixin],

setNativeProps:function(){function setNativeProps(props){
this.refs[SCROLLVIEW].setNativeProps(props);}return setNativeProps;}(),


/**
   * Returns a reference to the underlying scroll responder, which supports
   * operations like `scrollTo`. All ScrollView-like components should
   * implement this method so that they can be composed while providing access
   * to the underlying scroll responder's methods.
   */
getScrollResponder:function(){function getScrollResponder(){
return this;}return getScrollResponder;}(),


getInnerViewNode:function(){function getInnerViewNode(){
return _react2['default'].findNodeHandle(this.refs[INNERVIEW]);}return getInnerViewNode;}(),


endRefreshin:function(){function endRefreshin(){
_ScrollViewManager2['default'].endRefreshing(
_react2['default'].findNodeHandle(this));}return endRefreshin;}(),



scrollTo:function(){function scrollTo(){var destY=arguments.length<=0||arguments[0]===undefined?0:arguments[0];var destX=arguments.length<=1||arguments[1]===undefined?0:arguments[1];var animated=arguments.length<=2||arguments[2]===undefined?true:arguments[2];}return scrollTo;}(),



render:function(){function render(){
return null;}return render;}()});



module.exports=ScrollView;