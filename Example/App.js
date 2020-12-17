import React, {useRef, useState} from 'react';
import {StyleSheet, SafeAreaView, Text, View} from 'react-native';
import {
  PURPLE_COLOR,
  WHITE_COLOR,
  ITEMS,
  ReactNativeLogo,
  InfoIcon,
} from './constants';
import List from './List';
import DropdownAlert from 'react-native-dropdownalert';

const App = () => {
  const [queueSize, setQueueSize] = useState(0);
  let dropDownAlertRef = useRef(null);

  const _onProgrammaticClose = () => {
    dropDownAlertRef.closeAction();
  };
  const _onProgrammaticClear = () => {
    dropDownAlertRef.clearQueue();
  };
  const _showAlertQueue = () => {
    const types = ['info', 'warn', 'error', 'success', 'custom'];
    const message =
      'Officia eu do labore incididunt consequat sunt sint ullamco cillum.';
    let count = 1;
    types.map((type) => {
      dropDownAlertRef.alertWithType(
        type,
        `Alert ${count} of ${types.length}`,
        message,
      );
      count++;
    });
  };

  const _onSelect = ({item}) => {
    switch (item.type) {
      case 'close':
        _onProgrammaticClose();
        break;
      case 'clear':
        _onProgrammaticClear();
        break;
      case 'show':
        _showAlertQueue();
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
        dropDownAlertRef.alertWithType(
          item.type,
          title,
          item.message,
          payload,
          inMilliSeconds,
        );
    }
    _updateQueueSize();
  };

  const _onClose = (data) => {
    console.log(data);
    _updateQueueSize();
  };
  const _onCancel = (data) => {
    console.log(data);
    _updateQueueSize();
  };
  const _onTap = (data) => {
    console.log(data);
    _updateQueueSize();
  };
  const _updateQueueSize = () => {
    setQueueSize(dropDownAlertRef.getQueueSize());
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.size}>{`Alert queue size: ${queueSize}`}</Text>
        <List items={ITEMS} onSelect={_onSelect} />
      </SafeAreaView>
      <DropdownAlert
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
        containerStyle={styles.content}
        showCancel={true}
        onCancel={_onCancel}
        onTap={_onTap}
        titleNumOfLines={2}
        messageNumOfLines={0}
        onClose={_onClose}
      />
    </View>
  );
};

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

export default App;
