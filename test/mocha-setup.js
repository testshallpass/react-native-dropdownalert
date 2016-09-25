// Big thanks to the section on ignoring images:
// http://valuemotive.com/2016/08/01/unit-testing-react-native-components-with-mocha-and-enzyme/

const m = require('module');
const originalLoader = m._load;

m._load = function hookedLoader(request, parent, isMain) {
  if (request.match(/.jpeg|.jpg|.png$/)) {
    return { uri: request };
  }
  return originalLoader(request, parent, isMain);
}
