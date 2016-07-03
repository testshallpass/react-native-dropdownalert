/**
 * Playing around with the idea of requiring libraries from RN directly.
 *
 * Next steps: utilize RN's packager transform in order to parse the code.
 */
var path=require('path');
var absolutePathToRN=require.resolve('react-native');
var relativePathToRN=path.relative(__filename,absolutePathToRN);
var pathToLibraries=path.join(relativePathToRN,'../../');


function requireLibrary(lib){
var relPath=path.join(pathToLibraries,lib);
var absPath=path.resolve(__filename,relPath);
return require(absPath);}


// Example Usage:
// var normalizeColor = requireLibrary('StyleSheet/normalizeColor.js');
module.exports=requireLibrary;