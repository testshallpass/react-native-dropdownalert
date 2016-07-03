/*istanbul ignore next*/"use strict";

exports.__esModule = true;

exports.default = function ( /*istanbul ignore next*/_ref) {
  /*istanbul ignore next*/var t = _ref.types;

  return {
    visitor: {
      ObjectProperty: { /*istanbul ignore next*/
        exit: function exit(_ref2) {
          /*istanbul ignore next*/var node = _ref2.node;

          var key = node.key;
          if (!node.computed && t.isIdentifier(key) && !t.isValidIdentifier(key.name)) {
            // default: "bar" -> "default": "bar"
            node.key = t.stringLiteral(key.name);
          }
        }
      }
    }
  };
};

/*istanbul ignore next*/module.exports = exports["default"];