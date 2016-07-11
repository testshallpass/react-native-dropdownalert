### react-native-dropdownalert

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)
[![npm version](http://img.shields.io/npm/v/react-native-dropdownalert.svg)](https://www.npmjs.com/package/react-native-dropdownalert)
[![npm version](http://img.shields.io/npm/dm/react-native-dropdownalert.svg)](https://www.npmjs.com/package/react-native-dropdownalert)
[![Build Status](https://travis-ci.org/devBrian/react-native-dropdownalert.svg?branch=master)](https://travis-ci.org/devBrian/react-native-dropdownalert)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/devBrian/react-native-dropdownalert/master/LICENSE)

A dropdown alert that allows you to display bits of information to your users. Try 1 of 3 pre-defined types or roll your own custom type (see props below). The user can tap the alert to close it or it will close automatically after 4 seconds or you can choose how long (see closeInterval prop).

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
      <DropdownAlert ref={'dropdown'} />
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

```

### Types
---

![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/info.png)
![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/warning.png)
![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/error.png)
![screenshot](https://raw.github.com/devBrian/react-native-dropdownalert/master/screenshots/custom.png)

### Props
---

| Props name | Type | Description | Default
| ------------ | ------------- | ------------ |------------ |------------ |
| ```closeInterval``` | Number  | dismiss alert at a certain time in milliseconds | 4000
| ```backgroundColor``` | String  | background color of view | steelblue
| ```imageUri``` | String  | network image | ''
| ```imageSrc``` | Number  | local image | null
| ```textColor``` | String  | color for title and message | white
| ```fontFamily``` | String  | font for title and messsage | HelveticaNeue
| ```startDelta``` | Number  | where view starts at | -100
| ```endDelta``` | Number  | where view ends at | 0
| ```statusBarHidden``` | Boolean  | status bar visibility | false

Inspired by: [RKDropdownAlert](https://github.com/cwRichardKim/RKDropdownAlert)
