import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { MAIN_CUSTOM_COLOR } from './constants';
import List from './List';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  onSelect({ item, index }) {
    switch (item.type) {
      case 'close':
        this.forceClose();
        break;
      default:
        const random = Math.floor(Math.random() * 4000 + 1);
        const title = `${item.type} in ${random} milliseconds`;
        this.dropdown.alertWithType(item.type, title, item.message, {payload: 'HelloWorld'}, random);
    }
  }
  forceClose() {
    this.dropdown.closeAction();
  }
  onClose(data) {
    console.log(data);
  }
  onCancel(data) {
    console.log(data);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <List onSelect={({ item, index }) => this.onSelect({ item, index })} />
        <DropdownAlert
          ref={ref => this.dropdown = ref}
          containerStyle={{
            backgroundColor: MAIN_CUSTOM_COLOR,
          }}
          showCancel={true}
          onClose={data => this.onClose(data)}
          onCancel={data => this.onCancel(data)}
          messageNumOfLines={0}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EEEF',
  },
});
