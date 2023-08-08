import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  ImageSourcePropType,
  ColorValue,
} from 'react-native';
import DropdownAlert, {
  DropdownAlertData,
  DropdownAlertType,
  DropdownAlertColor,
  DropdownAlertProps,
} from 'react-native-dropdownalert';
import NotificationIOS from './NotificationIOS';
import NotificationAndroid from './NotificationAndroid';

type ListItem = {
  name: string;
  alertData?: DropdownAlertData;
  alertProps?: DropdownAlertProps;
  color: ColorValue;
};

type ListItemIndex = {
  item: ListItem;
  index: number;
};

function App(): JSX.Element {
  const defaultSelected: ListItem = {
    name: 'Default',
    color: DropdownAlertColor.Default,
  };
  const [selected, setSelected] = useState(defaultSelected);
  const [processing, setProcessing] = useState(false);
  let alert = useRef(
    (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
  );
  let dismiss = useRef(() => {});
  const reactNativeLogoSrc: ImageSourcePropType = {
    uri: 'https://reactnative.dev/docs/assets/favicon.png',
  };

  const items: ListItem[] = [
    {
      name: 'Warn',
      alertData: {
        type: DropdownAlertType.Warn,
        title: 'Warn',
        message:
          'The device battery is low. It will go into low power mode in 5 minutes.',
      },
      color: DropdownAlertColor.Warn,
    },
    {
      name: 'Info',
      alertData: {
        type: DropdownAlertType.Info,
        title: 'Info',
        message:
          'The system goes offline from midnight to 3 AM for regular maintenance.',
      },
      color: DropdownAlertColor.Info,
    },
    {
      name: 'Success',
      alertData: {
        type: DropdownAlertType.Success,
        title: 'Success',
        message: 'The order is complete and details sent to email.',
      },
      color: DropdownAlertColor.Success,
    },
    {
      name: 'Error',
      alertData: {
        type: DropdownAlertType.Error,
        title: 'Error',
        message:
          'Something went wrong. Please contact support if error persists.',
      },
      color: DropdownAlertColor.Error,
    },
    {
      name: 'Custom',
      alertData: {
        type: '',
        title: 'Custom',
        message:
          'This demonstrates the ability to customize image, interval and style.',
        source: reactNativeLogoSrc,
        interval: 5000,
      },
      alertProps: {
        alertViewStyle: styles.alertView,
      },
      color: styles.alertView.backgroundColor,
    },
    {
      name: 'iOS notification',
      alertProps: {
        updateStatusBar: false,
        children: <NotificationIOS />,
      },
      color: 'gray',
    },
    {
      name: 'Android notification',
      alertProps: {
        dismissInterval: 0,
        updateStatusBar: false,
        children: <NotificationAndroid />,
      },
      color: '#1F89C7',
    },
    {
      name: 'Cancel',
      alertData: {
        type: DropdownAlertType.Info,
        title: 'Info',
        message:
          'This demonstrates an info alert with a cancel button. Tap cancel button to dismiss.',
      },
      alertProps: {
        dismissInterval: 0,
        showCancel: true,
        onDismissPressDisabled: true,
      },
      color: 'teal',
    },
    {
      name: 'Bottom',
      alertData: {
        type: DropdownAlertType.Info,
        title: 'Info',
        message: 'This demonstrates an info alert with bottom alert position.',
      },
      alertProps: {
        alertPosition: 'bottom',
        infoColor: 'green',
      },
      color: 'green',
    },
  ];

  function _renderItem(listItemIndex: ListItemIndex) {
    const {item} = listItemIndex;
    return (
      <TouchableOpacity
        style={[styles.item, {backgroundColor: item.color}]}
        onPress={() => _onSelect(item)}
        disabled={processing}>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  function _onSelect(item: ListItem) {
    setSelected(item);
    setTimeout(async () => {
      setProcessing(true);
      await alert.current(item.alertData);
      setProcessing(false);
    }, 10);
  }

  return (
    <View style={styles.view}>
      <SafeAreaView>
        <FlatList
          keyExtractor={(_item, index) => `${index}`}
          data={items}
          initialNumToRender={items.length}
          renderItem={_renderItem}
        />
      </SafeAreaView>
      <DropdownAlert
        alert={func => (alert.current = func)}
        dismiss={func => (dismiss.current = func)}
        {...selected.alertProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F4F3E9',
  },
  item: {
    padding: 12,
    margin: 4,
    borderRadius: 8,
    borderColor: 'black',
    borderWidth: StyleSheet.hairlineWidth,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'whitesmoke',
  },
  alertView: {
    padding: 8,
    backgroundColor: '#6441A4',
  },
});

export default App;
