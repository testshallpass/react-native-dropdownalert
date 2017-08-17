import React, {Component} from 'react';
import {AppRegistry, View} from 'react-native';
import Main from './Main';

class DropDownAlert extends Component {
  render() {
    return <Main />;
  }
}
AppRegistry.registerComponent('DropDownAlert', () => DropDownAlert);
