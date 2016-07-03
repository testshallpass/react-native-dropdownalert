
const ScrollViewManager = {
  getContentSize(reactTag, callback) {
    Promise.resolve().then(() => callback({
      width: 20,
      height: 20,
    }));
  },
  calculateChildFrames(reactTag, callback) {
    Promise.resolve().then(() => callback({
      // TODO(lmr):
    }));
  },
  endRefreshing(reactTag) {

  },
  scrollTo(reactTag, offset, animated) {

  },
  zoomToRect(reactTag, rect, animated) {

  },
  DecelerationRate: {
    normal: 0,
    fast: 1,
  },
};

module.exports = ScrollViewManager;
