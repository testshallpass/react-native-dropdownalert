/**
 * Playing around with the idea of requiring libraries from RN directly.
 *
 * Next steps: utilize RN's packager transform in order to parse the code.
 */
const path = require('path');
const absolutePathToRN = require.resolve('react-native');
const relativePathToRN = path.relative(__filename, absolutePathToRN);
const pathToLibraries = path.join(relativePathToRN, '../../');


function requireLibrary(lib) {
  const relPath = path.join(pathToLibraries, lib);
  const absPath = path.resolve(__filename, relPath);
  return require(absPath);
}

// Example Usage:
// var normalizeColor = requireLibrary('StyleSheet/normalizeColor.js');
module.exports = requireLibrary;
