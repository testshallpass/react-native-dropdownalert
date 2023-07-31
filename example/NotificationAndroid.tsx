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
        activeOpacity={1}>
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
        activeOpacity={1}>
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
            style={[styles.expandIcon, {alignSelf: 'auto'}]}
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
  safeView: {
    margin: 8,
  },
  button: {
    padding: 12,
    backgroundColor: '#1F89C7',
    borderRadius: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 36,
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 8,
  },
  expandColumn: {
    flex: 1,
    flexDirection: 'column',
  },
  dot: {
    fontWeight: '600',
  },
  appName: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: 'white',
  },
  contentText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  smallIcon: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },
  bigIcon: {
    width: 46,
    height: 46,
    borderRadius: 8,
    marginHorizontal: 8,
  },
  expandIcon: {
    width: 22,
    height: 22,
    backgroundColor: 'lightgray',
    borderRadius: 11,
    alignSelf: 'flex-start',
  },
});

export default NotificationAndroid;
