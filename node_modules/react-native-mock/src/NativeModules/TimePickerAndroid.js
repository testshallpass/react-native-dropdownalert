// TODO(lmr): figure out a good way to toggle between timeSetAction and dismissedAction
let _resolver = () => ({ action: 'timeSetAction', hour: 2, minute: 30 });
const TimePickerAndroid = {
  open(options) {
    const result = _resolver(options) || { action: 'dismissedAction' };
    return Promise.resolve(result);
  },

  __setResolverFunction(resolver) {
    _resolver = resolver;
  }
};

module.exports = TimePickerAndroid;
