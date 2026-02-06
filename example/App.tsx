import React from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
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
import { SafeAreaView } from 'react-native-safe-area-context';

interface ListItem {
  name: string;
  alertData?: DropdownAlertData;
  alertProps?: DropdownAlertProps;
  color: ColorValue;
}

export default function App(): React.JSX.Element {
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
        source: {
          uri: 'https://reactnative.dev/img/pwa/manifest-icon-512.png',
        },
        interval: 5000,
      },
      alertProps: {
        alertViewStyle: {
          padding: 8,
          backgroundColor: '#6441A4',
        },
      },
      color: '#6441A4',
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
  const [selected, setSelected] = React.useState<ListItem | undefined>();
  let alert = React.useRef(
    (_data?: DropdownAlertData) => new Promise<DropdownAlertData>(res => res),
  );
  let dismiss = React.useRef(() => {});

  React.useEffect(() => {
    if (selected) {
      if (
        selected.alertProps?.alertPosition ||
        selected.alertProps?.children ||
        selected.alertProps?.showCancel
      ) {
        dismiss.current();
      }
      alert.current(selected.alertData);
    }
  }, [selected]);

  function _renderItem(item: ListItem): React.JSX.Element {
    return (
      <TouchableOpacity
        style={[styles.item, {backgroundColor: item.color}]}
        onPress={() => setSelected(item)}>
        <Text style={styles.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  function _renderFooter(): React.JSX.Element {
    return (
      <TouchableOpacity style={styles.item} onPress={dismiss.current}>
        <Text style={styles.name}>{'Dismiss'}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.view}>
      <FlatList
        keyExtractor={(_item, index) => `${index}`}
        data={items}
        initialNumToRender={items.length}
        renderItem={({item}) => _renderItem(item)}
        ListFooterComponent={_renderFooter}
      />
      {selected && (
        <DropdownAlert
          alert={func => (alert.current = func)}
          dismiss={func => (dismiss.current = func)}
          {...selected.alertProps}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#F4F3E9',
  },
  item: {
    padding: 8,
    margin: 8,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'whitesmoke',
  },
});
