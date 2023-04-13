import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ColorValue,
  SafeAreaView,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import DropdownAlert, {
  DropdownAlertColor,
  DropdownAlertData,
  DropdownAlertType,
} from './src/DropdownAlert';

type AlertItem = {
  color?: ColorValue;
  type: string;
  message?: string;
  title?: string;
};

type AlertListItem = {
  item: AlertItem;
  index: number;
};

function App(): JSX.Element {
  const items: AlertItem[] = [
    {
      title: 'Tap here to show info alert',
      color: DropdownAlertColor.Info,
      type: DropdownAlertType.Info,
      message:
        'System maintenance begins at midnight. System will be down for approximately 3 hours.',
    },
    {
      title: 'Tap here to show warn alert',
      color: DropdownAlertColor.Warn,
      type: DropdownAlertType.Warn,
      message:
        'Warning: low disk space. Please add more disk space at your earliest convenience.',
    },
    {
      title: 'Tap here to show error alert',
      color: DropdownAlertColor.Error,
      type: DropdownAlertType.Error,
      message:
        'Sorry, we are having some technical difficulties. Please try again.',
    },
    {
      title: 'Tap here to show success alert',
      color: DropdownAlertColor.Success,
      type: DropdownAlertType.Success,
      message: 'Order complete. We sent the receipt to your email.',
    },
    {
      title: 'Tap here to show custom alert',
      color: '#6441A4',
      type: 'custom',
      message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    },
    {type: 'fetch', title: 'Tap here to invoke fetch example', color: 'teal'},
    {type: 'dismiss', title: 'Tap here to dismiss alert', color: 'gray'},
    {type: 'show', title: 'Tap here to enqueue all alerts', color: 'black'},
  ];
  let alert = useRef(
    (
      _type?: string,
      _title?: string,
      _message?: string,
      _source?: ImageSourcePropType,
      _interval?: number,
    ) => {},
  );
  let dismiss = useRef(() => {});

  const _fetchData = async () => {
    try {
      alert.current('info', 'Info', 'Start fetch data');
      const response = await fetch('https://httpbin.org/uuid');
      const {uuid} = await response.json();
      alert.current('success', 'Success', uuid);
      throw 'Error fetch data'; // example thrown error
    } catch (error: any) {
      alert.current('error', 'Error', error);
    }
  };

  const _showAlertQueue = () => {
    const types = [
      DropdownAlertType.Info,
      DropdownAlertType.Warn,
      DropdownAlertType.Error,
      DropdownAlertType.Success,
      'custom',
      '',
    ];
    const message =
      'At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution.';
    let count = 1;
    types.forEach(type => {
      alert.current(type, `Alert ${count} of ${types.length}`, message);
      count++;
    });
  };

  const _renderHeader = () => {
    return <Text style={styles.header}>{'DropdownAlert Example'}</Text>;
  };

  const _renderItem = (alertListItem: AlertListItem) => {
    const {item} = alertListItem;
    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: item.color}]}
        onPress={() => _onSelect(alertListItem)}>
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const _onSelect = (alertListItem: AlertListItem) => {
    const {item} = alertListItem;
    switch (item.type) {
      case 'dismiss':
        dismiss.current();
        break;
      case 'show':
        _showAlertQueue();
        break;
      case 'fetch':
        _fetchData();
        break;
      default:
        const inMilliSeconds = Math.floor(Math.random() * 6000 + 1);
        const inSeconds = Number((inMilliSeconds / 1000).toFixed(2));
        const title = `${item.type} closes in ${inSeconds}s`;
        let source;
        if (item.type === 'custom') {
          source = {uri: 'https://reactnative.dev/docs/assets/favicon.png'};
        }
        alert.current(item.type, title, item.message, source, inMilliSeconds);
    }
  };

  const _onDismiss = (data: DropdownAlertData) => _log('onDismiss', data);
  const _onCancel = (data: DropdownAlertData) => _log('onCancel', data);
  const _onTap = (data: DropdownAlertData) => _log('onTap', data);
  const _log = (message: string, data?: DropdownAlertData) =>
    console.log(message, data);

  return (
    <View style={styles.view}>
      <SafeAreaView>
        <FlatList
          keyExtractor={item => item.type}
          data={items}
          renderItem={_renderItem}
          ListHeaderComponent={_renderHeader}
        />
      </SafeAreaView>
      <DropdownAlert
        alert={func => (alert.current = func)}
        dismiss={func => (dismiss.current = func)}
        containerStyle={styles.container}
        showCancel
        onCancel={_onCancel}
        onDismiss={_onDismiss}
        onTap={_onTap}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  button: {
    borderColor: 'dark gray',
    borderWidth: 1,
    padding: 10,
    margin: 4,
    borderRadius: 8,
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 8,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    height: 36,
    width: 36,
  },
  container: {
    backgroundColor: '#6441A4',
  },
});

export default App;
