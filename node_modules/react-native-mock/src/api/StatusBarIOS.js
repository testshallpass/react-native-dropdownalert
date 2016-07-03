let _style = {};
let _hidden = false;
let _networkActivityIndicatorVisible = true;

const StatusBarIOS = {

  setStyle(style, animated) {
    _style = style;
  },

  setHidden(hidden, animation) {
    _hidden = hidden;
  },

  setNetworkActivityIndicatorVisible(visible) {
    _networkActivityIndicatorVisible = visible;
  },

  __getStyle() {
    return _style;
  },

  __getHidden() {
    return _hidden;
  },

  __getNetworkActivityIndicatorVisible() {
    return _networkActivityIndicatorVisible;
  },
};

module.exports = StatusBarIOS;
