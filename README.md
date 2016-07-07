### react-native-dropdownalert

[![npm version](http://img.shields.io/npm/v/react-native-dropdownalert.svg?style=flat-square)](https://www.npmjs.com/package/react-native-dropdownalert "View this project on npm")
[![npm version](http://img.shields.io/npm/dm/react-native-dropdownalert.svg?style=flat-square)](https://www.npmjs.com/package/react-native-dropdownalert "View this project on npm")
[![Build Status](https://travis-ci.org/devBrian/react-native-dropdownalert.svg?branch=master)](https://travis-ci.org/devBrian/react-native-dropdownalert)

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
      <DropdownAlert ref={"dropdownalert"} />
    </View>
  )
}
// ...
handleServerResponse(err, response) {
  this.refs.dropdownalert.alert('error', 'Error', 'Sorry, there was an unexpected problem. Please try again.')
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

### License
---

[MIT](https://raw.github.com/devBrian/react-native-dropdownalert/master/LICENSE)
