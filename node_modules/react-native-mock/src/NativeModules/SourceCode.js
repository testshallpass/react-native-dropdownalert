/**
 * https://github.com/facebook/react-native/blob/master/React/Modules/RCTSourceCode.m
 */
let _sourceCode = null;

const SourceCode = {
  getScriptText() {
    return _sourceCode
      ? Promise.resolve(_sourceCode)
      : Promise.reject(new Error('Source code is not available'));
  },
  __setScriptText(url, text) {
    _sourceCode = !!url && !!text
      ? { url, text }
      : null;
  },
};

module.exports = SourceCode;
