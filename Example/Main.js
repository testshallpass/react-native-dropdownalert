import DropdownAlert from 'react-native-dropdownalert'
import React, { Component } from 'react'

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  View
} from 'react-native'

class Main extends Component {
  constructor(props) {
    super(props)
    this.showAlert = this.showAlert.bind(this)
    this.dismissAlert = this.dismissAlert.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
            <TouchableHighlight style={[styles.button, {backgroundColor: 'steelblue'}]} onPress={() => this.showAlert('info')} underlayColor={'lightgray'}>
              <Text style={styles.text}>
                {'info'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: 'peru'}]} onPress={() => this.showAlert('warn')} underlayColor={'lightgray'}>
              <Text style={styles.text}>
                {'warn'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: '#cc3232'}] } onPress={() => this.showAlert('error')} underlayColor={'lightgray'}>
              <Text style={styles.text}>
                {'error'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={[styles.button, {backgroundColor: 'darkcyan'}]} onPress={() => this.showAlert('custom')} underlayColor={'lightgray'}>
              <Text style={styles.text}>
                {'custom'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.dismissAlert()} underlayColor={'lightgray'}>
              <Text style={styles.text}>
                {'dismiss alert'}
              </Text>
            </TouchableHighlight>
        </ScrollView>
        <DropdownAlert
          ref={(ref) => this.dropdown = ref}
          titleStyle={{fontSize: 16, color: 'white', fontWeight: 'bold'}}
          messageStyle={{fontSize: 14, color: 'white'}}
          containerStyle={{backgroundColor: 'darkcyan'}}
          imageUri={'https://facebook.github.io/react/img/logo_og.png'}
        />
      </View>
    );
  }
  showAlert(type) {
    switch (type) {
      case 'info':
        this.dropdown.alert(type, 'Info', 'System is going down at midnight tonight. We\'ll notify you when it\'s back up.')
      break;
      case 'warn':
        this.dropdown.alert(type, 'Warning', 'You are about to reach capacity for uploaded files. Please archive unused files.')
      break;
      case 'error':
        this.dropdown.alert(type, 'Error', 'Sorry, we\'re having some technical difficulties. Our team will get this fixed for you ASAP.')
      break;
      case 'custom':
        this.dropdown.alert(type, 'Lorem ipsum dolor sit amet', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ante a mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ante a mauris.')
      break;
    }
  }
  dismissAlert() {
    this.dropdown.dismiss()
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
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
});

module.exports = Main
