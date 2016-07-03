var _react=require('react');var _react2=_interopRequireDefault(_react);



var _StyleSheetPropType=require('../propTypes/StyleSheetPropType');var _StyleSheetPropType2=_interopRequireDefault(_StyleSheetPropType);
var _NativeMethodsMixin=require('../mixins/NativeMethodsMixin');var _NativeMethodsMixin2=_interopRequireDefault(_NativeMethodsMixin);
var _EdgeInsetsPropType=require('../propTypes/EdgeInsetsPropType');var _EdgeInsetsPropType2=_interopRequireDefault(_EdgeInsetsPropType);
var _ImageStylePropTypes=require('../propTypes/ImageStylePropTypes');var _ImageStylePropTypes2=_interopRequireDefault(_ImageStylePropTypes);
var _ImageResizeMode=require('../propTypes/ImageResizeMode');var _ImageResizeMode2=_interopRequireDefault(_ImageResizeMode);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};} /**
 * https://github.com/facebook/react-native/blob/master/Libraries/Image/Image.ios.js
 */var PropTypes=_react2['default'].PropTypes;

var Image=_react2['default'].createClass({displayName:'Image',
propTypes:{
style:(0,_StyleSheetPropType2['default'])(_ImageStylePropTypes2['default']),
/**
     * `uri` is a string representing the resource identifier for the image, which
     * could be an http address, a local file path, or the name of a static image
     * resource (which should be wrapped in the `require('./path/to/image.png')` function).
     */
source:PropTypes.oneOfType([
PropTypes.shape({
uri:PropTypes.string}),

// Opaque type returned by require('./image.jpg')
PropTypes.number]),

/**
     * A static image to display while loading the image source.
     * @platform ios
     */
defaultSource:PropTypes.oneOfType([
PropTypes.shape({
uri:PropTypes.string}),

// Opaque type returned by require('./image.jpg')
PropTypes.number]),

/**
     * When true, indicates the image is an accessibility element.
     * @platform ios
     */
accessible:PropTypes.bool,
/**
     * The text that's read by the screen reader when the user interacts with
     * the image.
     * @platform ios
     */
accessibilityLabel:PropTypes.string,
/**
     * When the image is resized, the corners of the size specified
     * by capInsets will stay a fixed size, but the center content and borders
     * of the image will be stretched.  This is useful for creating resizable
     * rounded buttons, shadows, and other resizable assets.  More info on
     * [Apple documentation](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets)
     * @platform ios
     */
capInsets:_EdgeInsetsPropType2['default'],
/**
     * Determines how to resize the image when the frame doesn't match the raw
     * image dimensions.
     *
     * 'cover': Scale the image uniformly (maintain the image's aspect ratio)
     * so that both dimensions (width and height) of the image will be equal
     * to or larger than the corresponding dimension of the view (minus padding).
     *
     * 'contain': Scale the image uniformly (maintain the image's aspect ratio)
     * so that both dimensions (width and height) of the image will be equal to
     * or less than the corresponding dimension of the view (minus padding).
     *
     * 'stretch': Scale width and height independently, This may change the
     * aspect ratio of the src.
     */
resizeMode:PropTypes.oneOf(['cover','contain','stretch']),
/**
     * A unique identifier for this element to be used in UI Automation
     * testing scripts.
     */
testID:PropTypes.string,
/**
     * Invoked on mount and layout changes with
     * `{nativeEvent: {layout: {x, y, width, height}}}`.
     */
onLayout:PropTypes.func,
/**
     * Invoked on load start
     */
onLoadStart:PropTypes.func,
/**
     * Invoked on download progress with `{nativeEvent: {loaded, total}}`
     * @platform ios
     */
onProgress:PropTypes.func,
/**
     * Invoked on load error with `{nativeEvent: {error}}`
     * @platform ios
     */
onError:PropTypes.func,
/**
     * Invoked when load completes successfully
     */
onLoad:PropTypes.func,
/**
     * Invoked when load either succeeds or fails
     */
onLoadEnd:PropTypes.func},

mixins:[_NativeMethodsMixin2['default']],
statics:{
resizeMode:_ImageResizeMode2['default'],
getSize:function(){function getSize(uri,success,failure){}return getSize;}()},



render:function(){function render(){
return null;}return render;}()});



module.exports=Image;