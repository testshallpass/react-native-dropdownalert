import DropdownAlert from './DropdownAlert'
import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  ScrollView,
  View
} from 'react-native';

class Main extends Component {
  constructor(props) {
    super(props);
    this.openAlert = this.openAlert.bind(this)
    this.closeAlert = this.closeAlert.bind(this)
  }
  render() {
    return (
      <View style={{flex: 1}}>
      <DropdownAlert ref={"dropdownalert"} backgroundColor={'darkcyan'} imageUri={'https://facebook.github.io/react/img/logo_og.png'} fontFamily={'Gill Sans'} closeInterval={5000} />
      <ScrollView>
      <Text style={[styles.welcome, {marginTop: 22}]}> {'Dropdown Alerts'}</Text>
        <TouchableHighlight style={styles.container} onPress={() => this.openAlert('info')} underlayColor={'lightgray'}>
            <Text style={styles.welcome}>
              {'Info'}
            </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.container} onPress={() => this.openAlert('warn')} underlayColor={'lightgray'}>
            <Text style={styles.welcome}>
              {'Warning'}
            </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.container} onPress={() => this.openAlert('error')} underlayColor={'lightgray'}>
            <Text style={styles.welcome}>
              {'Error'}
            </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.container} onPress={() => this.openAlert('custom')} underlayColor={'lightgray'}>
            <Text style={styles.welcome}>
              {'Custom'}
            </Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.container} onPress={this.closeAlert} underlayColor={'lightgray'}>
            <Text style={styles.welcome}>
              {'Close Alert'}
            </Text>
        </TouchableHighlight>
      </ScrollView>
      </View>
    );
  }
  openAlert(type) {
    switch (type) {
      case 'info':
        this.refs.dropdownalert.alert(type, 'Info', 'System is going down at midnight tonight. We\'ll notify you when it\'s back up.')
      break;
      case 'warn':
        this.refs.dropdownalert.alert(type, 'Warning', 'You are about to reach capacity for uploaded files. Please archive unused files.')
      break;
      case 'error':
        this.refs.dropdownalert.alert(type, 'Error', 'Sorry, we\'re having some technical difficulties. Our team will get this fixed for you ASAP.')
      break;
      case 'custom':
        this.refs.dropdownalert.alert(type, 'Custom', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec convallis ante a mauris.')
      break;
    }
  }
  closeAlert() {
    this.refs.dropdownalert.dismiss()
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    margin: 8
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#333333'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Main
