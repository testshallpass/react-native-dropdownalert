/**
 * https://github.com/facebook/react-native/blob/master/Libraries/AppRegistry/AppRegistry.js
 */
const runnables = {};

const AppRegistry = {
  registerConfig(configs) {

  },

  registerComponent(appKey, getComponentFunc) {
    return appKey;
  },

  registerRunnable(appKey, func) {
    runnables[appKey] = { run: func };
    return appKey;
  },

  getAppKeys() {
    return Object.keys(runnables);
  },

  runApplication(appKey, appParameters) {

  },

  unmountApplicationComponentAtRootTag(rootTag) {

  },
};

module.exports = AppRegistry;
