import NativeVibration from '../NativeModules/Vibration';
import invariant from 'invariant';

/**
 * The Vibration API is exposed at `VibrationIOS.vibrate()`. On iOS, calling this
 * function will trigger a one second vibration. The vibration is asynchronous
 * so this method will return immediately.
 *
 * There will be no effect on devices that do not support Vibration, eg. the iOS
 * simulator.
 *
 * Vibration patterns are currently unsupported.
 */

const Vibration = {
  vibrate() {
    invariant(
      arguments[0] === undefined,
      'Vibration patterns not supported.'
    );
    NativeVibration.vibrate();
  }
};

module.exports = Vibration;
