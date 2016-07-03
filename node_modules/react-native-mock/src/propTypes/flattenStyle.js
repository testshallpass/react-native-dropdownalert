function flattenStyle(style) {
  if (!style) {
    return undefined;
  }
  if (!Array.isArray(style)) {
    return style;
  }
  return Object.assign({}, ...style);
}

module.exports = flattenStyle;
