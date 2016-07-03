var _style={};
var _hidden=false;
var _networkActivityIndicatorVisible=true;

var StatusBarIOS={

setStyle:function(){function setStyle(style,animated){
_style=style;}return setStyle;}(),


setHidden:function(){function setHidden(hidden,animation){
_hidden=hidden;}return setHidden;}(),


setNetworkActivityIndicatorVisible:function(){function setNetworkActivityIndicatorVisible(visible){
_networkActivityIndicatorVisible=visible;}return setNetworkActivityIndicatorVisible;}(),


__getStyle:function(){function __getStyle(){
return _style;}return __getStyle;}(),


__getHidden:function(){function __getHidden(){
return _hidden;}return __getHidden;}(),


__getNetworkActivityIndicatorVisible:function(){function __getNetworkActivityIndicatorVisible(){
return _networkActivityIndicatorVisible;}return __getNetworkActivityIndicatorVisible;}()};



module.exports=StatusBarIOS;