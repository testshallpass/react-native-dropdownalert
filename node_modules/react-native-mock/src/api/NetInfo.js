/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Network/NetInfo.js
 */
import Platform from '../plugins/Platform';
import DeviceEventEmitter from '../plugins/DeviceEventEmitter';

const DEVICE_CONNECTIVITY_EVENT = 'networkStatusDidChange';
const _subscriptions = new Map();

let isExpensive = false;
let networkInfo = {
  connected: true
};


const NetInfo = {
  addEventListener(eventname, handler) {
    const listener = DeviceEventEmitter.addListener(
      DEVICE_CONNECTIVITY_EVENT,
      ({ network_info }) => handler(network_info)
    );
    _subscriptions.set(handler, listener);
  },

  removeEventListener(eventName, handler) {
    const listener = _subscriptions.get(handler);
    if (!listener) {
      return;
    }
    listener.remove();
    _subscriptions.delete(handler);
  },

  fetch() {
    return Promise.resolve(networkInfo);
  },

  isConnected: {
    addEventListener(eventname, handler) {

    },

    removeEventListener(eventName, handler) {

    },
    fetch() {
      return NetInfo.fetch().then(info => info.connected);
    },
  },

  isConnectionExpensive(callback) {
    if (Platform.OS === 'android') {
      callback(isExpensive);
    } else {
      callback(null, 'Unsupported');
    }
  },

  // TODO(lmr): figure out a good way to expose setters here.
  __setNetworkInfo(info) {
    networkInfo = info;
  },
  __setIsConnectionExpensive(expensive) {
    isExpensive = expensive;
  },
  __setIsConnected(connected) {
    networkInfo = Object.assign({}, networkInfo, { connected });
  },
};

module.exports = NetInfo;
