# react-native-dropdownalert

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](http://facebook.github.io/react-native/)
[![npm version](http://img.shields.io/npm/v/react-native-dropdownalert.svg)](https://www.npmjs.com/package/react-native-dropdownalert)
[![npm version](http://img.shields.io/npm/dm/react-native-dropdownalert.svg)](https://www.npmjs.com/package/react-native-dropdownalert)
[![Build Status](https://travis-ci.org/testshallpass/react-native-dropdownalert.svg?branch=master)](https://travis-ci.org/testshallpass/react-native-dropdownalert)
[![codecov](https://codecov.io/gh/testshallpass/react-native-dropdownalert/branch/master/graph/badge.svg)](https://codecov.io/gh/testshallpass/react-native-dropdownalert)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/testshallpass/react-native-dropdownalert/master/LICENSE)

![screenshot](https://raw.github.com/testshallpass/react-native-dropdownalert/master/screenshots/info.png) ![screenshot](https://raw.github.com/testshallpass/react-native-dropdownalert/master/screenshots/warning.png) ![screenshot](https://raw.github.com/testshallpass/react-native-dropdownalert/master/screenshots/error.png) ![screenshot](https://raw.github.com/testshallpass/react-native-dropdownalert/master/screenshots/success.png)

### Table of contents

1. [Support](#support)
2. [Installation](#installation)
3. [Demo](#demo)
4. [Usage](#usage)
5. [Props](docs/PROPS.md)
6. [Caveats](#caveats)

A simple alert to notify users about new chat messages, something went wrong or everything is ok. It can be closed by tap, cancel button, automatically with `closeInterval`, pan responder up gesture or programmatically (```this.dropDownAlertRef.closeAction()```).

### Support

| react-native version | package version | reason |
| ---- | :---: | ---- |
| 0.50.0 | >=3.2.0 | Added SafeAreaView (iPhone X) |
| 0.44.0 | >=2.12.0 | Added ViewPropTypes |

### Installation

```npm i react-native-dropdownalert --save```

### Demo

![screenshot](https://raw.github.com/testshallpass/react-native-dropdownalert/master/screenshots/demo.gif)

### Usage

```javascript
import DropdownAlert from 'react-native-dropdownalert';
export default class App extends Component {
  componentDidMount() {
    this._fetchData();
  }
  _fetchData = async () => {
    try {
      await fetch('https://mywebsite.com/endpoint/');
      // alertWithType parameters: type, title, message, payload, interval.
      // There are 4 pre-defined types: info, warn, success, error.
      // payload object with source property overrides image source prop. (optional)
      // interval overrides closeInterval prop. (optional)
      this.dropDownAlertRef.alertWithType('success', 'Success', 'Fetch data is complete.');
    } catch (error) {
      this.dropDownAlertRef.alertWithType('error', 'Error', error.message);
    }
  };
  render() {
    // Make sure DropdownAlert is the last component in the document tree.
    return (
      <View>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </View>
    );
  }
}
```

### Caveats

* Modals can overlap DropdownAlert if it's not inside the modal's document tree.
* It is important you place the `DropdownAlert` **ABOVE** the `StackNavigator`.
  * [DropdownHolder example #1](https://gist.github.com/testshallpass/d76c656874e417bef4e0e6a63fc492af)
  * [DropdownHolder example #2](https://gist.github.com/testshallpass/6c6c867269348c485a1e0d6ae3f55e90)
  * [Redux + router flux example](https://gist.github.com/testshallpass/13f047205d1b966f55340b8962fe99c0)
  * Repo: [react-native-dropdownalert-router-sample](https://github.com/mitsuruog/react-native-dropdownalert-router-sample) Thanks @mitsuruog and @articolo

> Inspired by: [RKDropdownAlert](https://github.com/cwRichardKim/RKDropdownAlert)
