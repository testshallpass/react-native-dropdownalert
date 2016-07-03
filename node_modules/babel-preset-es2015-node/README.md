# babel-preset-es2015-node

> Babel preset for all es2015 plugins needed with latest stable node.

## Install

#### Node 6
```sh
$ npm install --save-dev babel-preset-es2015-node@6
```
#### Node 5
```sh
$ npm install --save-dev babel-preset-es2015-node@5
```
#### Node 4
```sh
$ npm install --save-dev babel-preset-es2015-node@4
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["es2015-node"]
}
```

### Via CLI

```sh
$ babel script.js --preset es2015-node
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["es2015-node"]
});
```
