import NativeAppEventEmitter from '../plugins/NativeAppEventEmitter';

const TestModule = {
  verifySnapshot(callback) {
    Promise.resolve().then(() => callback(true));
  },
  sendAppEvent(name, body) {
    NativeAppEventEmitter.emit(name, body);
  },
  shouldResolve() {
    return Promise.resolve(1);
  },
  shouldReject() {
    return Promise.reject(null);
  },
  markTestCompleted() {

  },
  markTestPassed(success) {

  },
};

module.exports = TestModule;
