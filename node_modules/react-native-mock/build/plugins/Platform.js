/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Utilities/Platform.android.js
 */
var Platform={
OS:'ios',
Version:undefined,

/**
   * Exposed in react-native-mock for testing purposes. Not part of real API.
   */
__setOS:function(){function __setOS(os){
Platform.OS=os;}return __setOS;}(),


select:function(){function select(objs){
return objs[Platform.OS];}return select;}(),


/**
   * Exposed in react-native-mock for testing purposes. Not part of real API.
   */
__setVersion:function(){function __setVersion(version){
Platform.Version=version;}return __setVersion;}()};



module.exports=Platform;