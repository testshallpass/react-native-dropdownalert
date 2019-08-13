import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { PURPLE_COLOR, WHITE_COLOR, ITEMS } from './constants';
import List from './List';

export default class App extends Component {
  _onSelect({ item }) {
    switch (item.type) {
      case 'close':
        this._onProgrammaticClose();
        break;
      default:
        const random = Math.floor(Math.random() * 4000 + 1);
        const title = `${item.type} \ncloses in ${random / 1000} seconds`;
        this.dropDownAlertRef.alertWithType(
          item.type,
          title,
          item.message,
          { message: 'HelloWorld', source: 'https://facebook.github.io/react-native/docs/assets/favicon.png' },
          random
        );
    }
  }
  _onProgrammaticClose = () => {
    this.dropDownAlertRef.closeAction();
  };
  _onClose = data => {
    console.log(data);
  };
  _onCancel = data => {
    console.log(data);
  };
  _onTap = data => {
    console.log(data);
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <List items={ITEMS} onSelect={({ item }) => this._onSelect({ item })} />
        <DropdownAlert
          ref={ref => this.dropDownAlertRef = ref}
          containerStyle={{
            backgroundColor: PURPLE_COLOR,
          }}
          showCancel={true}
          onCancel={this._onCancel}
          onTap={this._onTap}
          titleNumOfLines={2}
          messageNumOfLines={0}
          onClose={this._onClose}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
});
