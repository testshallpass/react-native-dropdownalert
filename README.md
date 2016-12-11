## react-native-dropdownalert

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)
[![npm version](http://img.shields.io/npm/v/react-native-dropdownalert.svg)](https://www.npmjs.com/package/react-native-dropdownalert)
[![npm version](http://img.shields.io/npm/dm/react-native-dropdownalert.svg)](https://www.npmjs.com/package/react-native-dropdownalert)
[![Build Status](https://travis-ci.org/devBrian/react-native-dropdownalert.svg?branch=master)](https://travis-ci.org/devBrian/react-native-dropdownalert)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/devBrian/react-native-dropdownalert/master/LICENSE)

A way to display bits of information to users. You can try 1 of 3 pre-defined types or roll your own. The user can tap the alert to close it or pan gesture up or close automatically after 4 seconds, see ```closeInterval``` prop.

### Installation
```
npm i react-native-dropdownalert --save
```

### Demo
![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/demo.gif)

### Usage
```javascript

import DropdownAlert from 'react-native-dropdownalert'
// ...
render() {
  return (
    <View>
      // !!! Make sure it's the last component in your document tree.
      <DropdownAlert ref={(ref) => this.dropdown = ref} onClose={(data) => this.onClose(data)} />
    </View>
  )
}
// ...
handleServerResponse(err, response) {
  if (err != null) {
    this.dropdown.alertWithType('error', 'Error', err)
  }
}
// ...
onClose(data) {
  // data = {type, title, message}
}
// ...
```

### Types

| info | warn | error | custom
| ------------ | ------------- | ------------ |------------ |------------ |
|![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/info.png) |![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/warning.png) |![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/error.png)|![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/custom.png)

### Props
| Name | Type | Description | Default
| ---- | ---- | ------------ | --------- |
| ```closeInterval``` | Number  | dismiss alert at a certain time in milliseconds | 4000
| ```imageSrc``` | String or Number  | local or network source | null
| ```startDelta``` | Number  | where the container starts (changes based on container height onLayout) | -100
| ```endDelta``` | Number  | where the container ends | 0
| ```onClose``` | Function  | Fires when alert closes either by user or  ```closeInterval``` Returns: ```data = {type, title, message}```  | null
| ```cancelBtnImageSrc``` | String or Number | local or network source | ```require('./assets/cancel.png')``` |
| ```titleNumOfLines``` | Number  | number of lines | 1
| ```messageNumOfLines``` | Number  | number of lines | 3
| ```onCancel``` | Function  | Cancel button action. Returns: ```data = {type, title, message}``` | null
| ```showCancel``` | Bool  | whether or not to show cancel button | false
| ```tapToCloseEnabled``` | Bool  | enable close with tap | true
| ```panResponderEnabled``` | Bool  | enable close with pan responder | true
| ```containerStyle``` | View.propTypes.style  | styles for container for custom type only | ```{ padding: 16, flexDirection: 'row' }```
| ```titleStyle``` | Text.propTypes.style  | styles for title for all types | ```{       fontSize: 16, textAlign: 'left', fontWeight: 'bold', color: 'white', backgroundColor: 'transparent' }```
| ```messageStyle``` | Text.propTypes.style  | styles for message for all types | ```{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', color: 'white', backgroundColor: 'transparent' }```
| ```imageStyle``` | Image.propTypes.style  | styles for image for all types | ```{    padding: 8, width: 36, height: 36, alignSelf: 'center' }```
| ```cancelBtnImageStyle``` | Image.propTypes.style  | styles for image for all types | ```{    padding: 8, width: 36, height: 36, alignSelf: 'center' }```


> Inspired by: [RKDropdownAlert](https://github.com/cwRichardKim/RKDropdownAlert)
