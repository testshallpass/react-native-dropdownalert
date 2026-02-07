import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';
import { expo } from './app.json';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from './Color';

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
};

const NotificationAndroid: React.FunctionComponent<
  NotificationAndroidProps
> = ({
  bigIcon = reactNativeLogoSrc,
  smallIcon = reactNativeLogoSrc,
  appName = expo.name,
  contentTitle = 'Tap to expand',
  contentText = 'Ipsum tempor tempor ea occaecat ipsum commodo do minim magna excepteur. Commodo non ex consectetur laboris sunt consequat laborum amet exercitation tempor anim sint cillum.',
  timestamp = 'now',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  function _setIsExpanded() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  }

  function _renderExpand() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={_setIsExpanded}
        activeOpacity={1}
      >
        <View style={styles.row}>
          <Image source={smallIcon} style={styles.smallIcon} />
          <Text style={styles.appName}>
            {appName}
            <Text style={styles.dot}>{' \u2022 '}</Text>
            {timestamp}
          </Text>
          <Image source={bigIcon} style={styles.bigIcon} />
          <Image
            source={require('./assets/arrowup.png')}
            style={styles.expandIcon}
          />
        </View>
        <View style={styles.expandRow}>
          <View style={styles.expandColumn}>
            <Text style={styles.contentTitle} numberOfLines={1}>
              {'Tap to collapse'}
            </Text>
            <Text style={styles.contentText} numberOfLines={0}>
              {contentText}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function _renderNotExpand() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={_setIsExpanded}
        activeOpacity={1}
      >
        <View style={styles.row}>
          <Image source={smallIcon} style={styles.smallIcon} />
          <View style={styles.column}>
            <Text style={styles.contentTitle} numberOfLines={1}>
              {contentTitle}
            </Text>
            <Text style={styles.contentText} numberOfLines={1}>
              {contentText}
            </Text>
          </View>
          <Image source={bigIcon} style={styles.bigIcon} />
          <Image
            source={require('./assets/arrowdown.png')}
            style={styles.expandIcon}
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.safeView}>
      {isExpanded ? _renderExpand() : _renderNotExpand()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appName: {
    color: Color.white,
    fontSize: 14,
    fontWeight: '400',
  },
  bigIcon: {
    borderRadius: 8,
    height: 46,
    marginHorizontal: 8,
    width: 46,
  },
  button: {
    backgroundColor: Color.softBlue,
    borderRadius: 16,
    padding: 12,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 8,
  },
  contentText: {
    color: Color.white,
    fontSize: 14,
    fontWeight: '400',
  },
  contentTitle: {
    color: Color.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  dot: {
    fontWeight: '600',
  },
  expandColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  expandIcon: {
    alignSelf: 'auto',
    backgroundColor: Color.lightGray,
    borderRadius: 11,
    height: 22,
    width: 22,
  },
  expandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 36,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  safeView: {
    margin: 8,
  },
  smallIcon: {
    borderRadius: 13,
    height: 26,
    width: 26,
  },
});

export default NotificationAndroid;
