const ReactNativeMock = require('./build/react-native');

// the cache key that real react native would get
const key = require.resolve('react-native');

// make sure the cache is filled with our lib
require.cache[key] = {
  id: key,
  filename: key,
  loaded: true,
  exports: ReactNativeMock,
};
