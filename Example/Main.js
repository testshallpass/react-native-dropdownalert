import DropdownAlert from './DropdownAlert'
import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  Image,
  StatusBar,
  View
} from 'react-native'

const MAIN_INFO_COLOR = '#2B73B6'
const MAIN_WARN_COLOR = '#cd853f'
const MAIN_ERROR_COLOR = '#cc3232'
const MAIN_CUSTOM_COLOR = '#6441A4'
const MAIN_SUCCESS_COLOR = '#32A54A'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      type: '',
      title: '',
      message: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <StatusBar barStyle="default" />
            <TouchableHighlight style={[styles.button, {backgroundColor: MAIN_INFO_COLOR}]} onPress={() => this.showAlert('info')} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'info'}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: MAIN_WARN_COLOR}]} onPress={() => this.showAlert('warn')} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'warn'}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: MAIN_ERROR_COLOR}] } onPress={() => this.showAlert('error')} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'error'}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: MAIN_SUCCESS_COLOR}] } onPress={() => this.showAlert('success')} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'success'}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: MAIN_CUSTOM_COLOR}]} onPress={() => this.showAlert('custom')} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'custom'}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.closeAlert()} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'dismiss alert'}</Text>
            </TouchableHighlight>
        </ScrollView>
        <DropdownAlert
          visible={this.state.visible}
          type={this.state.type}
          title={this.state.title}
          message={this.state.message}
          titleNumOfLines={1}
          messageNumOfLines={3}
          closeInterval={4000}
          containerStyle={{
            backgroundColor: MAIN_CUSTOM_COLOR,
          }}
          onClose={(data) => this.onClose(data)}
          onCancel={(data) => this.onClose(data)}
          showCancel={false}
          imageSrc={'https://facebook.github.io/react/img/logo_og.png'}
        />
      </View>
    );
  }
  showAlert = (type) => {
    var randomNum = Math.floor((Math.random() * 1000) + 1)
    var title = ''
    var message = ''
    switch (type) {
      case 'info':
        title = 'Info #' + randomNum
        message = 'System is going down at 12 AM tonight for routine maintenance. We\'ll notify you when the system is back online.'
      break;
      case 'warn':
        title = 'Warning #' + randomNum
        message = 'Your cloud drive is about to reach capacity. Please consider upgrading to premium plan.'
      break;
      case 'error':
        title = 'Error #' + randomNum
        message = 'Sorry, we\'re having some technical difficulties. Our team will get this fixed for you ASAP.'
      break;
      case 'success':
        title = 'Success #' + randomNum
        message = 'Thank you for your order. We will email and charge you when it\'s on it\'s way.'
      break;
      case 'custom':
        title = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit #' + randomNum
        message = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      break;
    }
    const {visible} = this.state
    this.setState({
      visible: (visible) ? false : true,
      type: type,
      title: title,
      message: message
    })
  }
  closeAlert() {
    // FIXME: Does not work when change type in sequence
    const {visible} = this.state
    this.setState({
      visible: (visible) ? false : true,
    })
  }
  onClose(data) {
    console.log(data)
    this.setState({
      visible: false,
    })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EEEF'
  },
  contentContainer: {
    marginTop: 22
  },
  button: {
    backgroundColor: '#748182',
    margin: 8,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
});

module.exports = Main
