import ActionSheetManager from '../NativeModules/ActionSheetManager';
import invariant from 'invariant';
import processColor from '../plugins/processColor';

const ActionSheetIOS = {
  showActionSheetWithOptions(options, callback) {
    invariant(
      typeof options === 'object' && options !== null,
      'Options must a valid object'
    );
    invariant(
      typeof callback === 'function',
      'Must provide a valid callback'
    );
    ActionSheetManager.showActionSheetWithOptions(
      { ...options, tintColor: processColor(options.tintColor) },
      callback
    );
  },

  showShareActionSheetWithOptions(
    options,
    failureCallback,
    successCallback
  ) {
    invariant(
      typeof options === 'object' && options !== null,
      'Options must a valid object'
    );
    invariant(
      typeof failureCallback === 'function',
      'Must provide a valid failureCallback'
    );
    invariant(
      typeof successCallback === 'function',
      'Must provide a valid successCallback'
    );
    ActionSheetManager.showShareActionSheetWithOptions(
      { ...options, tintColor: processColor(options.tintColor) },
      failureCallback,
      successCallback
    );
  }
};

module.exports = ActionSheetIOS;
