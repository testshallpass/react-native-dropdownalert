import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import {name} from './app.json';
const reactNativeLogoSrc: ImageSourcePropType = {
  uri: 'https://reactnative.dev/docs/assets/favicon.png',
};

type NotificationAndroidProps = {
  bigIcon?: ImageSourcePropType;
  smallIcon?: ImageSourcePropType;
  appName?: string;
  contentTitle?: string;
  contentText?: string;
  timestamp?: string;
  action?: () => void;
};

const NotificationAndroid: React.FunctionComponent<
  NotificationAndroidProps
> = ({
  bigIcon = reactNativeLogoSrc,
  smallIcon = reactNativeLogoSrc,
  appName = name,
  contentTitle = 'Tap to expand',
  contentText = 'Ipsum tempor tempor ea occaecat ipsum commodo do minim magna excepteur. Commodo non ex consectetur laboris sunt consequat laborum amet exercitation tempor anim sint cillum.',
  timestamp = 'now',
  action = () => {},
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  let contentTextNumberOfLines = 1;
  let expandIcon: ImageSourcePropType = require('./assets/arrowdown.png');
  if (isExpanded) {
    expandIcon = require('./assets/arrowup.png');
    contentTextNumberOfLines = 0;
  }

  function _setIsExpanded() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  }

  return (
    <SafeAreaView style={styles.safeView}>
      <TouchableOpacity
        style={styles.view}
        onPress={_setIsExpanded}
        activeOpacity={1}>
        <View style={styles.row}>
          <Image source={smallIcon} style={styles.smallIcon} />
          <Text style={styles.appName}>{appName}</Text>
          <Text style={styles.timestamp}>
            {' \u2022 '}
            {timestamp}
          </Text>
          <Image source={expandIcon} style={styles.expandIcon} />
        </View>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.contentTitle} numberOfLines={1}>
              {contentTitle}
            </Text>
            <Text
              style={styles.contentText}
              numberOfLines={contentTextNumberOfLines}>
              {contentText}
            </Text>
          </View>
          <Image source={bigIcon} style={styles.bigIcon} />
        </View>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.actionView}>
          <TouchableOpacity onPress={action}>
            <Text style={styles.action}>{'DISMISS'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    margin: 8,
  },
  view: {
    padding: 12,
    backgroundColor: '#FEFEFE',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
  },
  timestamp: {
    fontSize: 12,
    fontWeight: '300',
  },
  appName: {
    fontSize: 12,
    fontWeight: '400',
    color: '#1F89C7',
  },
  contentTitle: {
    fontSize: 14,
  },
  contentText: {
    fontSize: 12,
    fontWeight: '300',
  },
  smallIcon: {
    width: 15,
    height: 15,
    marginRight: 4,
  },
  bigIcon: {
    width: 30,
    height: 30,
    marginLeft: 4,
  },
  actionView: {
    flexDirection: 'row',
    backgroundColor: '#EDEDED',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#B8B8B8',
    padding: 12,
  },
  action: {
    fontSize: 12,
    color: '#1F89C7',
  },
  expandIcon: {
    width: 15,
    height: 15,
    marginRight: 4,
    tintColor: '#1F89C7',
  },
});

export default NotificationAndroid;
