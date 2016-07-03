var 
UIManager={
removeSubviewsFromContainerWithID:function(){function removeSubviewsFromContainerWithID(containerId){}return removeSubviewsFromContainerWithID;}(),


removeRootView:function(){function removeRootView(rootReactTag){}return removeRootView;}(),


replaceExistingNonRootView:function(){function replaceExistingNonRootView(reactTag,newReactTag){}return replaceExistingNonRootView;}(),


setChildren:function(){function setChildren(containerTag,reactTags){}return setChildren;}(),


manageChildren:function(){function manageChildren(
containerReactTag,
moveFromIndices,
moveToIndices,
addChildReactTags,
addAtIndices,
removeAtIndices)
{}return manageChildren;}(),


createView:function(){function createView(reactTag,viewName,rootTag,props){}return createView;}(),


updateView:function(){function updateView(reactTag,viewName,props){}return updateView;}(),


focus:function(){function focus(reactTag){}return focus;}(),


blur:function(){function blur(reactTag){}return blur;}(),


findSubviewIn:function(){function findSubviewIn(reactTag,atPoint,callback){}return findSubviewIn;}(),


dispatchViewManagerCommand:function(){function dispatchViewManagerCommand(reactTag,commandID,commandArgs){}return dispatchViewManagerCommand;}(),


measure:function(){function measure(reactTag,callback){}return measure;}(),


measureLayout:function(){function measureLayout(reactTag,relativeTo,errorCallback,callback){}return measureLayout;}(),


measureLayoutRelativeToParent:function(){function measureLayoutRelativeToParent(reactTag,errorCallback,callback){}return measureLayoutRelativeToParent;}(),


measureViewsInRect:function(){function measureViewsInRect(rect,parentView,errorCallback,callback){}return measureViewsInRect;}(),


setJSResponder:function(){function setJSResponder(reactTag,blockNativeResponder){}return setJSResponder;}(),


clearJSResponder:function(){function clearJSResponder(){}return clearJSResponder;}(),


configureNextLayoutAnimation:function(){function configureNextLayoutAnimation(callback,errorCallback){}return configureNextLayoutAnimation;}()};




module.exports=UIManager;