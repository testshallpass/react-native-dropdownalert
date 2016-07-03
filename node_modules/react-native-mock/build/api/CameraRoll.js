var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value" in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _invariant=require('invariant');var _invariant2=_interopRequireDefault(_invariant);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _CameraRollManager=require('../NativeModules/CameraRollManager');var _CameraRollManager2=_interopRequireDefault(_CameraRollManager);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}var 

PropTypes=_react2['default'].PropTypes;

var GROUP_TYPES_OPTIONS=[
'Album',
'All',
'Event',
'Faces',
'Library',
'PhotoStream',
'SavedPhotos']; // default


var ASSET_TYPE_OPTIONS=[
'All',
'Videos',
'Photos'];


/**
 * Shape of the param arg for the `getPhotos` function.
 */ // default
var getPhotosParamChecker=PropTypes.shape({
/**
   * The number of photos wanted in reverse order of the photo application
   * (i.e. most recent first for SavedPhotos).
   */
first:PropTypes.number.isRequired,

/**
   * A cursor that matches `page_info { end_cursor }` returned from a previous
   * call to `getPhotos`
   */
after:PropTypes.string,

/**
   * Specifies which group types to filter the results to.
   */
groupTypes:PropTypes.oneOf(GROUP_TYPES_OPTIONS),

/**
   * Specifies filter on group names, like 'Recent Photos' or custom album
   * titles.
   */
groupName:PropTypes.string,

/**
   * Specifies filter on asset type
   */
assetType:PropTypes.oneOf(ASSET_TYPE_OPTIONS),

/**
   * Filter by mimetype (e.g. image/jpeg).
   */
mimeTypes:PropTypes.arrayOf(PropTypes.string)});var 


CameraRoll=function(){function CameraRoll(){_classCallCheck(this,CameraRoll);}_createClass(CameraRoll,null,[{key:'saveImageWithTag',

/**
   * Saves the image to the camera roll / gallery.
   *
   * On Android, the tag is a local URI, such as `"file:///sdcard/img.png"`.
   *
   * On iOS, the tag can be one of the following:
   *
   *   - local URI
   *   - assets-library tag
   *   - a tag not matching any of the above, which means the image data will
   * be stored in memory (and consume memory as long as the process is alive)
   *
   * Returns a Promise which when resolved will be passed the new URI.
   */value:function(){function saveImageWithTag(
tag){
(0,_invariant2['default'])(
typeof tag==='string',
'CameraRoll.saveImageWithTag tag must be a valid string.');

// TODO(lmr):
return _CameraRollManager2['default'].saveImageWithTag(tag);}return saveImageWithTag;}()


/**
   * Returns a Promise with photo identifier objects from the local camera
   * roll of the device matching shape defined by `getPhotosReturnChecker`.
   *
   * @param {object} params See `getPhotosParamChecker`.
   *
   * Returns a Promise which when resolved will be of shape `getPhotosReturnChecker`.
   */},{key:'getPhotos',value:function(){function getPhotos(
params){
if(process.env.NODE_ENV==='development'){
getPhotosParamChecker({params:params},'params','CameraRoll.getPhotos');}

// TODO(lmr):
// TODO: Add the __DEV__ check back in to verify the Promise result
return _CameraRollManager2['default'].getPhotos(params);}return getPhotos;}()}]);return CameraRoll;}();



CameraRoll.GroupTypesOptions=GROUP_TYPES_OPTIONS;
CameraRoll.AssetTypeOptions=ASSET_TYPE_OPTIONS;

module.exports=CameraRoll;