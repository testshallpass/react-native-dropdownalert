module.exports.validateType = function(type) {
  if (type.length === 0 || type === null) {
    console.warn('Missing DropdownAlert type. Available types: info, warn, error or custom');
    return false;
  }
  if (type != 'info' && type != 'warn' && type != 'error' && type != 'custom' && type != 'success') {
    console.warn('Invalid DropdownAlert type. Available types: info, warn, error, success, or custom');
    return false;
  }
  return true;
};
