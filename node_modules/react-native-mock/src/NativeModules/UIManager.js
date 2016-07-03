
const UIManager = {
  removeSubviewsFromContainerWithID(containerId) {

  },
  removeRootView(rootReactTag) {

  },
  replaceExistingNonRootView(reactTag, newReactTag) {

  },
  setChildren(containerTag, reactTags) {

  },
  manageChildren(
    containerReactTag,
    moveFromIndices,
    moveToIndices,
    addChildReactTags,
    addAtIndices,
    removeAtIndices
  ) {

  },
  createView(reactTag, viewName, rootTag, props) {

  },
  updateView(reactTag, viewName, props) {

  },
  focus(reactTag) {

  },
  blur(reactTag) {

  },
  findSubviewIn(reactTag, atPoint, callback) {

  },
  dispatchViewManagerCommand(reactTag, commandID, commandArgs) {

  },
  measure(reactTag, callback) {

  },
  measureLayout(reactTag, relativeTo, errorCallback, callback) {

  },
  measureLayoutRelativeToParent(reactTag, errorCallback, callback) {

  },
  measureViewsInRect(rect, parentView, errorCallback, callback) {

  },
  setJSResponder(reactTag, blockNativeResponder) {

  },
  clearJSResponder() {

  },
  configureNextLayoutAnimation(callback, errorCallback) {

  },
};

module.exports = UIManager;
