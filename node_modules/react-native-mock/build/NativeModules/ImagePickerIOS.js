var _canRecordVideos=true;
var _canUseCamera=true;

var ImagePickerIOS={
canRecordVideos:function(){function canRecordVideos(callback){
Promise.resolve(_canRecordVideos).then(callback);}return canRecordVideos;}(),

canUseCamera:function(){function canUseCamera(callback){
Promise.resolve(_canUseCamera).then(callback);}return canUseCamera;}(),

openCameraDialog:function(){function openCameraDialog(config,success,cancel){
// TODO(lmr):
}return openCameraDialog;}(),
openSelectDialog:function(){function openSelectDialog(config,success,cancel){
// TODO(lmr):
}return openSelectDialog;}()};


module.exports=ImagePickerIOS;