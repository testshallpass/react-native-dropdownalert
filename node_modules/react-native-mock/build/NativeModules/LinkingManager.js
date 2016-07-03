var _test=function(){function _test(url){return true;}return _test;}();
var LinkingManger={
openURL:function(){function openURL(url){
return Promise.resolve(true);}return openURL;}(),

canOpenURL:function(){function canOpenURL(url){
return Promise.resolve(_test(url));}return canOpenURL;}(),


__setCanOpenURLTest:function(){function __setCanOpenURLTest(test){
_test=test;}return __setCanOpenURLTest;}()};



module.exports=LinkingManger;