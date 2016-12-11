import DropdownAlert from './DropdownAlert'
import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  Image,
  View
} from 'react-native'

const MAIN_INFO_COLOR = '#4682b4'
const MAIN_WARN_COLOR = '#cd853f'
const MAIN_ERROR_COLOR = '#cc3232'
const MAIN_CUSTOM_COLOR = '#6441A4'

class Main extends Component {
  constructor(props) {
    super(props)
    this.showAlert = this.showAlert.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <TouchableHighlight style={[styles.button, {backgroundColor: MAIN_INFO_COLOR}]} onPress={() => this.showAlert('info')} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'info'}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: MAIN_WARN_COLOR}]} onPress={() => this.showAlert('warn')} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'warn'}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: MAIN_ERROR_COLOR}] } onPress={() => this.showAlert('error')} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'error'}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: MAIN_CUSTOM_COLOR}]} onPress={() => this.showAlert('custom')} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'custom'}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.closeAlert()} underlayColor={'lightgray'}>
              <Text style={styles.text}>{'close alert'}</Text>
            </TouchableHighlight>
        </ScrollView>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          titleNumOfLines={2}
          messageNumOfLines={5}
          closeInterval={0}
          containerStyle={{
            backgroundColor: MAIN_CUSTOM_COLOR,
            margin: 20,
            borderRadius: 8
          }}
          onClose={(data) => this.onClose(data)}
          onCancel={(data) => this.onClose(data)}
          showCancel={true}
          imageSrc={'https://facebook.github.io/react/img/logo_og.png'}
        />
      </View>
    );
  }
  showAlert(type) {
    switch (type) {
      case 'info':
        this.dropdown.alertWithType(type, 'Info', 'System is going down at 12 AM tonight for routine maintenance. We\'ll notify you when the system is back online.')
      break;
      case 'warn':
        this.dropdown.alertWithType(type, 'Warning', 'Your cloud drive is about to reach capacity. Please consider upgrading to premium plan.')
      break;
      case 'error':
        this.dropdown.alertWithType(type, 'Error', 'Sorry, we\'re having some technical difficulties. Our team will get this fixed for you ASAP.')
      break;
      case 'custom':
        this.dropdown.alert('Custom', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ante a mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ante a mauris.')
      break;
    }
  }
  closeAlert() {
    this.dropdown.onClose()
  }
  onClose(data) {
    console.log(data)
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'honeydew'
  },
  contentContainer: {
    marginTop: 22,
  },
  button: {
    backgroundColor: 'gray',
    margin: 8,
    borderRadius: 8,
    padding: 8,
    alignItems: 'center'
  },
  text: {
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: 'white'
  },
});

module.exports = Main
