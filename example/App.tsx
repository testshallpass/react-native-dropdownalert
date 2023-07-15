import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import DropdownAlert, {
  DropdownAlertData,
  DropdownAlertType,
} from './src/DropdownAlert';
import NotificationIOS from './NotificationIOS';
import NotificationAndroid from './NotificationAndroid';

type ListItem = {
  name: string;
  description?: string;
  alert: JSX.Element;
  action?: () => void;
};

type ListItemIndex = {
  item: ListItem;
  index: number;
};

function App(): JSX.Element {
  const defaultSelected: ListItem = {
    name: 'Default',
    alert: <DropdownAlert />,
  };
  const [selected, setSelected] = useState(defaultSelected);
  let alert = useRef(
    (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
  );
  let dismiss = useRef(() => {});
  const reactNativeLogoSrc: ImageSourcePropType = {
    uri: 'https://reactnative.dev/docs/assets/favicon.png',
  };

  const items: ListItem[] = [
    {
      name: 'Fetch data',
      description:
        'This demonstrates all the DropdownAlertTypes by showing them before and after an API request.',
      action: async function _fetchData() {
        try {
          await alert.current({
            type: 'warn',
            title: 'Warning',
            message: 'Fetch data is about to start',
          });
          await alert.current({
            type: 'info',
            title: 'Info',
            message: 'Fetch data is going to start',
          });
          const response = await fetch('https://httpbin.org/uuid');
          const {uuid} = await response.json();
          await alert.current({
            type: 'success',
            title: 'Success',
            message: `Fetch data return: ${uuid}`,
          });
          throw 'Error fetch data';
        } catch (error: any) {
          await alert.current({type: 'error', title: 'Error', message: error});
        }
      },
      alert: <DropdownAlert alert={func => (alert.current = func)} />,
    },
    {
      name: 'Queue processing',
      description:
        "This demonstrates the DropDownAlert's first in first out (FIFO) queue by invoking alert multiple times in a for loop.",
      action: function _showAlertQueue() {
        const types = [
          DropdownAlertType.Info,
          DropdownAlertType.Warn,
          DropdownAlertType.Error,
          DropdownAlertType.Success,
          '',
        ];
        let count = 1;
        types.forEach(type => {
          alert.current({
            type,
            title: `Queue alert #${count} of ${types.length}`,
            message: `Message for alert #${count}. Deserunt in nulla irure et laboris cillum velit aliquip irure aute velit.`,
          });
          count++;
        });
      },
      alert: <DropdownAlert alert={func => (alert.current = func)} />,
    },
    {
      name: 'Custom DropdownAlert',
      description:
        'This demonstrates the ability to set a remote image and change the background color.',
      action: () => {
        alert.current({
          type: '',
          title: 'Custom DropdownAlert',
          message:
            'Ut qui labore exercitation esse exercitation sint mollit exercitation qui nulla.',
          source: reactNativeLogoSrc, // can also use imageSrc prop
          interval: 5000,
        });
      },
      alert: (
        <DropdownAlert
          alert={func => (alert.current = func)}
          alertViewStyle={styles.alertView}
        />
      ),
    },
    {
      name: 'iOS notification',
      description:
        'This demonstrates build your own alert (BYOA) by showing a custom child component.',
      action: () => {
        alert.current();
      },
      alert: (
        <DropdownAlert
          alert={func => (alert.current = func)}
          updateStatusBar={false}>
          <NotificationIOS />
        </DropdownAlert>
      ),
    },
    {
      name: 'Android notification',
      description:
        'This demonstrates build your own alert (BYOA) by showing a custom child component.',
      action: () => {
        alert.current();
      },
      alert: (
        <DropdownAlert
          alert={func => (alert.current = func)}
          dismiss={func => (dismiss.current = func)}
          updateStatusBar={false}>
          <NotificationAndroid action={() => dismiss.current()} />
        </DropdownAlert>
      ),
    },
    {
      name: 'Cancel',
      description: 'This demonstrates Info alert with a cancel button',
      alert: (
        <DropdownAlert alert={func => (alert.current = func)} showCancel />
      ),
      action: () => {
        alert.current({
          type: 'info',
          title: 'Info',
          message: 'Tap cancel button to dismiss alert',
        });
      },
    },
  ];

  function _renderHeader() {
    return <Text style={styles.header}>{'DropdownAlert examples'}</Text>;
  }

  function _renderItem(listItemIndex: ListItemIndex) {
    const {item} = listItemIndex;
    return (
      <TouchableOpacity style={styles.item} onPress={() => _onSelect(item)}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </TouchableOpacity>
    );
  }

  function _renderSeparator() {
    return <View style={styles.separator} />;
  }

  function _onSelect(item: ListItem) {
    setSelected(item);
    setTimeout(() => {
      if (item.action) {
        item.action();
      }
    }, 100);
  }

  return (
    <View style={styles.view}>
      <SafeAreaView>
        <FlatList
          keyExtractor={(_item, index) => `${index}`}
          data={items}
          initialNumToRender={items.length}
          renderItem={_renderItem}
          ListHeaderComponent={_renderHeader}
          ItemSeparatorComponent={_renderSeparator}
        />
      </SafeAreaView>
      {selected.alert}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#32302F',
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  item: {
    padding: 8,
  },
  name: {
    fontSize: 16,
    color: 'white',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },
  separator: {
    backgroundColor: 'white',
    height: StyleSheet.hairlineWidth,
  },
  alertView: {
    padding: 8,
    backgroundColor: '#6441A4',
  },
});

export default App;
