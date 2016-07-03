/**
 * https://github.com/facebook/react-native/blob/master/Libraries/Components/Clipboard/Clipboard.js
 */
let _content = null;

const Clipboard = {
  getString() {
    return Promise.resolve(_content);
  },

  setString(content) {
    _content = content;
  },
};

module.exports = Clipboard;
