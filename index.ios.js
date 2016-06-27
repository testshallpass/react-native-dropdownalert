/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import Main from './Main'
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native'

class DropDownAlert extends Component {
  render() {
    return (
      <Main />
    )
  }
}

const styles = StyleSheet.create({

})

AppRegistry.registerComponent('DropDownAlert', () => DropDownAlert)
