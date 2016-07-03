function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else {return Array.from(arr);}}function flattenStyle(style){
if(!style){
return undefined;}

if(!Array.isArray(style)){
return style;}

return Object.assign.apply(Object,[{}].concat(_toConsumableArray(style)));}


module.exports=flattenStyle;