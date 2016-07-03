var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;}; /**
 * https://github.com/facebook/react-native/blob/master/Libraries/Utilities/Dimensions.js
 */
var dimensions={
// TODO(lmr): find the other dimensions to put in here...
window:{
width:320,
height:768,
scale:2,
fontScale:2}};



var Dimensions={
set:function(){function set(dims){
_extends(dimensions,dims);
return true;}return set;}(),

get:function(){function get(dim){
return dimensions[dim];}return get;}()};



module.exports=Dimensions;