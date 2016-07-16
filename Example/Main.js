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
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'beige'}}>
        <DropdownAlert ref={'dropdown'} backgroundColor={'darkcyan'} imageUri={'https://facebook.github.io/react/img/logo_og.png'} fontFamily={'AvenirNext-Regular'} closeInterval={0} />
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableHighlight style={styles.button} onPress={() => this.showAlert('info')} underlayColor={'lightgray'}>
              <Text style={styles.text}>
                {'Info'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.showAlert('warn')} underlayColor={'lightgray'}>
              <Text style={styles.text}>
                {'Warning'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.showAlert('error')} underlayColor={'lightgray'}>
              <Text style={styles.text}>
                {'Error'}
              </Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button} onPress={() => this.showAlert('custom')} underlayColor={'lightgray'}>
              <Text style={styles.text}>
                {'Custom'}
              </Text>
            </TouchableHighlight>
        </ScrollView>
      </View>
    );
  }
  showAlert(type) {
    switch (type) {
      case 'info':
        this.refs.dropdown.alert(type, 'Info', 'System is going down at midnight tonight. We\'ll notify you when it\'s back up.')
      break;
      case 'warn':
        this.refs.dropdown.alert(type, 'Warning', 'You are about to reach capacity for uploaded files. Please archive unused files.')
      break;
      case 'error':
        this.refs.dropdown.alert(type, 'Error', 'Sorry, we\'re having some technical difficulties. Our team will get this fixed for you ASAP.')
      break;
      case 'custom':
        this.refs.dropdown.alert(type, 'Custom', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ante a mauris.')
      break;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20
  },
  button: {
    backgroundColor: 'powderblue',
    margin: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#333333',
    fontFamily: 'Avenir'
  },
});

module.exports = Main
