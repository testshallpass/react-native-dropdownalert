/*istanbul ignore next*/"use strict";

exports.__esModule = true;

exports.default = function ( /*istanbul ignore next*/_ref) {
  /*istanbul ignore next*/var t = _ref.types;

  return {
    visitor: {
      MemberExpression: { /*istanbul ignore next*/
        exit: function exit(_ref2) {
          /*istanbul ignore next*/var node = _ref2.node;

          var prop = node.property;
          if (!node.computed && t.isIdentifier(prop) && !t.isValidIdentifier(prop.name)) {
            // foo.default -> foo["default"]
            node.property = t.stringLiteral(prop.name);
            node.computed = true;
          }
        }
      }
    }
  };
};

/*istanbul ignore next*/module.exports = exports["default"];