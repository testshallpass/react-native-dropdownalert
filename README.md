## react-native-dropdownalert

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)
[![npm version](http://img.shields.io/npm/v/react-native-dropdownalert.svg)](https://www.npmjs.com/package/react-native-dropdownalert)
[![npm version](http://img.shields.io/npm/dm/react-native-dropdownalert.svg)](https://www.npmjs.com/package/react-native-dropdownalert)
[![Build Status](https://travis-ci.org/devBrian/react-native-dropdownalert.svg?branch=master)](https://travis-ci.org/devBrian/react-native-dropdownalert)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/devBrian/react-native-dropdownalert/master/LICENSE)

A dropdown alert that allows you to display bits of information to your users. Try 1 of 3 pre-defined types or roll your own custom type (see props below). The user can tap the alert to close it or it will close automatically after 4 seconds or you can choose how long (see closeInterval prop).

### Announcement >= v1.9.0
To make this highly customizable and scalable a few props have been removed (**see props below**). New style props have been added to take over the work and provide more flexibly.

### Installation
---
```bash
npm i react-native-dropdownalert --save
```

### Demo
---

![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/demo.gif)

### Usage
---

```javascript

import DropdownAlert from 'react-native-dropdownalert'
// ...
render() {
  return (
    <View>
      <DropdownAlert ref={'dropdown'} onClose={this.onClose} />
    </View>
  )
}
// ...
handleServerResponse(err, response) {
  if (err != null) {
    // Inform the user of the error.
    this.refs.dropdown.alert('error', 'Error', err)
  }
}
// ...
onClose(data) {
  // data = {type, title, message}
}
// ...

```

### Types
---
| Info | Warn | Error | Custom
| ------------ | ------------- | ------------ |------------ |------------ |
|![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/info.png) |![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/warning.png) |![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/error.png)|![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/custom.png)

### Props
---

| Name | Type | Description | Default | Status
| ------------ | ------------- | ------------ |------------ |------------ |
| ```closeInterval``` | Number  | dismiss alert at a certain time in milliseconds | 4000 | Available
| ```backgroundColor``` | String  | background color of view | steelblue | Removed (use containerStyle)
| ```imageUri``` | String  | network image | '' | Available
| ```imageSrc``` | Number  | local image | null | Available
| ```textColor``` | String  | color for title and message | white | Removed (use messageStyle or titleStyle)
| ```fontFamily``` | String  | font for title and message | HelveticaNeue | Removed (use messageStyle or titleStyle)
| ```startDelta``` | Number  | where view starts at | -200 | Available
| ```endDelta``` | Number  | where view ends at | 0 | Available
| ```statusBarHidden``` | Boolean  | status bar visibility | false | Removed
| ```onClose``` | Function  | Fires when alert dismisses either by user or ```closeInterval``` & will pass this: ```data = {type, title, message}```  | null | Available
| ```containerStyle``` | View.propTypes.style  | look & feel of container for custom type only | ```{ padding: 12, flexDirection: 'row', alignItems: 'center', backgroundColor: 'dimgray' }``` | Available
| ```titleStyle``` | Text.propTypes.style  | look & feel of title for all types | ```{       fontSize: 16, textAlign: 'left', fontWeight: 'bold', color: 'white', backgroundColor: 'transparent' }``` | Available
| ```messageStyle``` | Text.propTypes.style  | look & feel of message for all types | ```{ fontSize: 14, textAlign: 'left', fontWeight: 'bold', color: 'white', backgroundColor: 'transparent' }``` | Available
| ```imageStyle``` | Image.propTypes.style  | look & feel of image for all types | ```{    padding: 8, width: 36, height: 36 }``` | Available
| ```titleNumOfLines``` | Number  | number of lines (set to 0 for unlimited) | 1 | Available
| ```messageNumOfLines``` | Number  | number of lines (set to 0 for unlimited) | 3 | Available


> Inspired by: [RKDropdownAlert](https://github.com/cwRichardKim/RKDropdownAlert)
