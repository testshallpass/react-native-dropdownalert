function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i];}return arr2;}else {return Array.from(arr);}} /**
 * https://github.com/facebook/react-native/blob/master/Libraries/StyleSheet/StyleSheet.js
 */
var StyleSheet={
create:function(){function create(styles){
return styles;}return create;}(),

flatten:function(){function flatten(styles){
if(Array.isArray(styles)){
return Object.assign.apply(Object,[{}].concat(_toConsumableArray(styles.map(StyleSheet.flatten))));}


return styles;}return flatten;}()};



module.exports=StyleSheet;