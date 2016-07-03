/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Components/Clipboard/Clipboard.js
 */
var _content=null;

var Clipboard={
getString:function(){function getString(){
return Promise.resolve(_content);}return getString;}(),


setString:function(){function setString(content){
_content=content;}return setString;}()};



module.exports=Clipboard;