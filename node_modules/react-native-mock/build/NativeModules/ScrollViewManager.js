var 
ScrollViewManager={
getContentSize:function(){function getContentSize(reactTag,callback){
Promise.resolve().then(function(){return callback({
width:20,
height:20});});}return getContentSize;}(),


calculateChildFrames:function(){function calculateChildFrames(reactTag,callback){
Promise.resolve().then(function(){return callback({
// TODO(lmr):
});});}return calculateChildFrames;}(),

endRefreshing:function(){function endRefreshing(reactTag){}return endRefreshing;}(),


scrollTo:function(){function scrollTo(reactTag,offset,animated){}return scrollTo;}(),


zoomToRect:function(){function zoomToRect(reactTag,rect,animated){}return zoomToRect;}(),


DecelerationRate:{
normal:0,
fast:1}};



module.exports=ScrollViewManager;