/**
 * https://github.com/facebook/react-native/blob/master/Libraries/AppRegistry/AppRegistry.js
 */
var runnables={};

var AppRegistry={
registerConfig:function(){function registerConfig(configs){}return registerConfig;}(),



registerComponent:function(){function registerComponent(appKey,getComponentFunc){
return appKey;}return registerComponent;}(),


registerRunnable:function(){function registerRunnable(appKey,func){
runnables[appKey]={run:func};
return appKey;}return registerRunnable;}(),


getAppKeys:function(){function getAppKeys(){
return Object.keys(runnables);}return getAppKeys;}(),


runApplication:function(){function runApplication(appKey,appParameters){}return runApplication;}(),



unmountApplicationComponentAtRootTag:function(){function unmountApplicationComponentAtRootTag(rootTag){}return unmountApplicationComponentAtRootTag;}()};




module.exports=AppRegistry;