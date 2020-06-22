import React, {Component} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import DropdownAlert from './src/DropdownAlert';
import {PURPLE_COLOR, WHITE_COLOR, ITEMS, ReactNativeLogo} from './constants';
import List from './List';
const InfoIcon = require('./assets/info.png');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queueSize: 0,
    };
  }
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
        let payload;
        if (item.type === 'custom') {
          // example using remote image source in payload
          payload = {source: ReactNativeLogo};
        } else if (item.type === 'info') {
          // example using local image source in payload
          payload = {source: InfoIcon};
        }
        this.dropDownAlertRef.alertWithType(
          item.type,
          title,
          item.message,
          payload,
          inMilliSeconds,
        );
    }
    this._updateQueueSize();
  }
  _onProgrammaticClose = () => {
    this.dropDownAlertRef.closeAction();
  };
  _onProgrammaticClear = () => {
    this.dropDownAlertRef.clearQueue();
  };
  _showAlertQueue = () => {
    const types = ['info', 'warn', 'error', 'success', 'custom'];
    const message =
      'Officia eu do labore incididunt consequat sunt sint ullamco cillum.';
    let count = 1;
    types.map(type => {
      this.dropDownAlertRef.alertWithType(
        type,
        `Alert ${count} of ${types.length}`,
        message,
      );
      count++;
    });
  };
  _onClose = data => {
    console.log(data);
    this._updateQueueSize();
  };
  _onCancel = data => {
    console.log(data);
    this._updateQueueSize();
  };
  _onTap = data => {
    console.log(data);
    this._updateQueueSize();
  };
  _updateQueueSize = () => {
    this.setState({queueSize: this.dropDownAlertRef.getQueueSize()});
  };
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.size}>{`Alert queue size: ${
            this.state.queueSize
          }`}</Text>
          <List
            items={ITEMS}
            onSelect={({item, index}) => this._onSelect({item, index})}
          />
        </SafeAreaView>
        <DropdownAlert
          ref={ref => (this.dropDownAlertRef = ref)}
          containerStyle={styles.content}
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
    justifyContent: 'center',
  },
  content: {
    backgroundColor: PURPLE_COLOR,
  },
  size: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 8,
  },
});
