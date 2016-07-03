var _NativeAppEventEmitter=require('../plugins/NativeAppEventEmitter');var _NativeAppEventEmitter2=_interopRequireDefault(_NativeAppEventEmitter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var TestModule={
verifySnapshot:function(){function verifySnapshot(callback){
Promise.resolve().then(function(){return callback(true);});}return verifySnapshot;}(),

sendAppEvent:function(){function sendAppEvent(name,body){
_NativeAppEventEmitter2['default'].emit(name,body);}return sendAppEvent;}(),

shouldResolve:function(){function shouldResolve(){
return Promise.resolve(1);}return shouldResolve;}(),

shouldReject:function(){function shouldReject(){
return Promise.reject(null);}return shouldReject;}(),

markTestCompleted:function(){function markTestCompleted(){}return markTestCompleted;}(),


markTestPassed:function(){function markTestPassed(success){}return markTestPassed;}()};




module.exports=TestModule;