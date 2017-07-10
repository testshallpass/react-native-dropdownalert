import DropdownAlert from './DropdownAlert'
import React, { Component, PropTypes } from 'react'
import {StyleSheet, Text, TouchableOpacity, FlatList, Image, StatusBar, View} from 'react-native'
// Colors
const MAIN_INFO_COLOR = '#2B73B6'
const MAIN_WARN_COLOR = '#cd853f'
const MAIN_ERROR_COLOR = '#cc3232'
const MAIN_SUCCESS_COLOR = '#32A54A'
const MAIN_CUSTOM_COLOR = '#6441A4'
const MAIN_DISMISS_COLOR = '#748182'

export default class Main extends Component {
  constructor(props) {
    super(props)
    const items = [
      {key: 0, backgroundColor: MAIN_INFO_COLOR, type: 'info', title: 'Info', message: 'System is going down at 12 AM tonight for routine maintenance. We\'ll notify you when the system is back online.'},
      {key: 1, backgroundColor: MAIN_WARN_COLOR, type: 'warn', title: 'Warning', message: 'Your cloud drive is about to reach capacity. Please consider upgrading to premium plan.'},
      {key: 2, backgroundColor: MAIN_ERROR_COLOR, type: 'error', title: 'Error', message: 'Sorry, we\'re having some technical difficulties. Our team will get this fixed for you ASAP.'},
      {key: 3, backgroundColor: MAIN_SUCCESS_COLOR, type: 'success', title: 'Success', message: 'Thank you for your order. We will email and charge you when it\'s on it\'s way.'},
      {key: 4, backgroundColor: MAIN_CUSTOM_COLOR, type: 'custom', title: 'Custom', message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
      {key: 5, backgroundColor: MAIN_DISMISS_COLOR, type: 'dismiss', title: 'Dismiss alert'}
    ]
    this.state = {
      items: items
    }
  }
  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={[styles.button, {backgroundColor: item.backgroundColor}]} onPress={() => this.showAlert(item)}>
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
  render() {
    const {items} = this.state
    return (
      <View style={styles.container}>
        <StatusBar />
        <FlatList
          style={styles.listContainer}
          data={items}
          renderItem={this.renderItem} />
        <DropdownAlert
          infoColor="#404553"
          showCancel
          ref={(ref) => this.dropdown = ref}
          containerStyle={{
            backgroundColor: MAIN_CUSTOM_COLOR,
          }}
          onClose={(data) => this.onClose(data)}
          imageSrc={'https://facebook.github.io/react/img/logo_og.png'}
        />
      </View>
    );
  }
  showAlert(item) {
    if (item.type == 'dismiss') {
      this.dismissAlert()
    } else {
      const random = Math.floor((Math.random() * 1000) + 1)
      const title = item.title + ' #' + random
      this.dropdown.alertWithType(item.type, title, item.message)
    }
  }
  dismissAlert = () => {
    this.dropdown.onClose()
  }
  onClose(data) {
    console.log(data);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EEEF'
  },
  listContainer: {
    paddingTop: 22
  },
  button: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 8,
    margin: 8
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white'
  },
});
