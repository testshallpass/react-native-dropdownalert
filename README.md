# react-native-dropdownalert

[![Platform](https://img.shields.io/badge/platform-react--native-lightgrey.svg)](https://reactnative.dev)
[![npm version](http://img.shields.io/npm/v/react-native-dropdownalert.svg)](https://www.npmjs.com/package/react-native-dropdownalert)
[![npm version](http://img.shields.io/npm/dm/react-native-dropdownalert.svg)](https://www.npmjs.com/package/react-native-dropdownalert)
[![Build Status](https://travis-ci.org/testshallpass/react-native-dropdownalert.svg?branch=master)](https://travis-ci.org/testshallpass/react-native-dropdownalert)
[![codecov](https://codecov.io/gh/testshallpass/react-native-dropdownalert/branch/master/graph/badge.svg)](https://codecov.io/gh/testshallpass/react-native-dropdownalert)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.github.com/testshallpass/react-native-dropdownalert/master/LICENSE)

| info | warn | error | success |
| :----: | :---: | :----: | :----: |
| ![screenshot](https://raw.github.com/testshallpass/react-native-dropdownalert/master/screenshots/info.png) | ![screenshot](https://raw.github.com/testshallpass/react-native-dropdownalert/master/screenshots/warning.png) | ![screenshot](https://raw.github.com/testshallpass/react-native-dropdownalert/master/screenshots/error.png) | ![screenshot](https://raw.github.com/testshallpass/react-native-dropdownalert/master/screenshots/success.png) |

## Table of contents

1. [Support](#support)
2. [Installation](#installation)
3. [Demo](#demo)
4. [Usage](#usage)
5. [Props](docs/PROPS.md)
6. [Caveats](#caveats)

An alert to notify users about new chat messages, something went wrong or everything is okay. It can be closed by tap, cancel button, automatically with `closeInterval`, pan responder up gesture or programmatically (```this.dropDownAlertRef.closeAction()```).

## Support

| react-native version | package version | reason |
| ---- | :---: | ---- |
| 0.50.0 | >=3.2.0 | Included SafeAreaView (iPhone X) |
| 0.44.0 | >=2.12.0 | Adopted ViewPropTypes |

## Installation

* ```npm i react-native-dropdownalert --save```
* ```yarn add react-native-dropdownalert```

## Demo

![screenshot](https://raw.github.com/testshallpass/react-native-dropdownalert/master/screenshots/demo.gif)

## Usage

```javascript
import DropdownAlert from 'react-native-dropdownalert';
export default class App extends Component {
  componentDidMount() {
    this._fetchData();
  }
  _fetchData = async () => {
    try {
      // alertWithType parameters: type, title, message, payload, interval.
      // payload object that includes a source property overrides the image source prop. (optional: object)
      // interval takes precedence over the closeInterval prop. (optional: number)
      this.dropDownAlertRef.alertWithType('info', 'Info', 'Start fetch data.');
      await fetch('https://httpbin.org/get');
      this.dropDownAlertRef.alertWithType('success', 'Success', 'Finish fetch data');
    } catch (error) {
      this.dropDownAlertRef.alertWithType('error', 'Error', error);
    }
  };
  render() {
    // DropdownAlert must be last component in the document tree.
    // This ensures that it overlaps other UI components.
    return (
      <View>
        <DropdownAlert ref={ref => this.dropDownAlertRef = ref} />
      </View>
    );
  }
}
```

## Caveats

* Modals can overlap DropdownAlert if it is not inside the modal's document tree.
* It is important you place the `DropdownAlert` **ABOVE** the `StackNavigator`.
  * [DropdownHolder example #1](https://gist.github.com/testshallpass/d76c656874e417bef4e0e6a63fc492af)
  * [DropdownHolder example #2](https://gist.github.com/testshallpass/6c6c867269348c485a1e0d6ae3f55e90)
  * [Redux + router flux example](https://gist.github.com/testshallpass/13f047205d1b966f55340b8962fe99c0)
  * Repo: [react-native-dropdownalert-router-sample](https://github.com/mitsuruog/react-native-dropdownalert-router-sample) Thanks @mitsuruog and @articolo

> Inspired by: [RKDropdownAlert](https://github.com/cwRichardKim/RKDropdownAlert)
