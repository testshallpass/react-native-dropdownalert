/**
 * https://github.com/facebook/react-native/blob/master/React/Modules/RCTSourceCode.m
 */
var _sourceCode=null;

var SourceCode={
getScriptText:function(){function getScriptText(){
return _sourceCode?
Promise.resolve(_sourceCode):
Promise.reject(new Error('Source code is not available'));}return getScriptText;}(),

__setScriptText:function(){function __setScriptText(url,text){
_sourceCode=!!url&&!!text?
{url:url,text:text}:
null;}return __setScriptText;}()};



module.exports=SourceCode;