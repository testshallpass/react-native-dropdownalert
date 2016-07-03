// TODO(lmr): figure out a good way to toggle between timeSetAction and dismissedAction
var _resolver=function(){function _resolver(){return {action:'timeSetAction',hour:2,minute:30};}return _resolver;}();
var TimePickerAndroid={
open:function(){function open(options){
var result=_resolver(options)||{action:'dismissedAction'};
return Promise.resolve(result);}return open;}(),


__setResolverFunction:function(){function __setResolverFunction(resolver){
_resolver=resolver;}return __setResolverFunction;}()};



module.exports=TimePickerAndroid;