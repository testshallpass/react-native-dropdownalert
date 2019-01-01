const validateType = function(type) {
  const types = ['info', 'warn', 'error', 'success', 'custom'];
  if (!type || type.length === 0 || types.includes(type) == false) {
    console.warn('Invalid DropdownAlert type. Available types: info, warn, error, success or custom');
    return false;
  }
  return true;
};
module.exports = {
  validateType,
};
