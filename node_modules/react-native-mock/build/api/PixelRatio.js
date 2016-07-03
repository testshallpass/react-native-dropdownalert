/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Utilities/PixelRatio.js
 */
var PixelRatio={
get:function(){function get(){
return 2;}return get;}(),

getFontScale:function(){function getFontScale(){
return 2;}return getFontScale;}(),

getPixelSizeForLayoutSize:function(){function getPixelSizeForLayoutSize(layoutSize){
return Math.round(layoutSize*PixelRatio.get());}return getPixelSizeForLayoutSize;}(),

roundToNearestPixel:function(){function roundToNearestPixel(layoutSize){
var ratio=PixelRatio.get();
return Math.round(layoutSize*ratio)/ratio;}return roundToNearestPixel;}(),

startDetecting:function(){function startDetecting(){}return startDetecting;}()};




module.exports=PixelRatio;