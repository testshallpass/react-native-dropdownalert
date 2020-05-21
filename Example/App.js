import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import {PURPLE_COLOR, WHITE_COLOR, ITEMS, ReactNativeLogo} from './constants';
import List from './List';
const InfoIcon = require('./assets/info.png');

export default class App extends Component {
  _onSelect({item, index}) {
    switch (item.type) {
      case 'close':
        this._onProgrammaticClose();
        break;
      case 'clear':
        this._onProgrammaticClear();
        break;
      case 'show':
        this._showAlertQueue();
        break;
      default:
        const inMilliSeconds = Math.floor(Math.random() * 4000 + 1);
        const inSeconds = (inMilliSeconds / 1000).toFixed(2);
        const title = `${item.type} closes in ${inSeconds}s`;
        // local image source
        let payload = {message: 'HelloWorld', source: InfoIcon};
        if (index % 2 === 0) {
          // remote image source
          payload = {message: 'HelloWorld', source: ReactNativeLogo};
        }
        this.dropDownAlertRef.alertWithType(
          item.type,
          title,
          item.message,
          payload,
          inMilliSeconds,
        );
    }
  }
  _onProgrammaticClose = () => {
    this.dropDownAlertRef.closeAction();
  };
  _onProgrammaticClear = () => {
    this.dropDownAlertRef.clearQueue();
  };
  _showAlertQueue = () => {
    this.dropDownAlertRef.alertWithType('info', 'Info', 'Alert queue #1');
    this.dropDownAlertRef.alertWithType('warn', 'Warn', 'Alert queue #2');
    this.dropDownAlertRef.alertWithType('error', 'Error', 'Alert queue #3');
    this.dropDownAlertRef.alertWithType('', 'Custom', 'Alert queue #4');
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
      <View style={styles.container}>
        <SafeAreaView>
          <List
            items={ITEMS}
            onSelect={({item, index}) => this._onSelect({item, index})}
          />
        </SafeAreaView>
        <DropdownAlert
          ref={ref => (this.dropDownAlertRef = ref)}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE_COLOR,
  },
});
