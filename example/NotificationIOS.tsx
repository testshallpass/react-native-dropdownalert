import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  LayoutAnimation,
} from 'react-native';
import {name} from './app.json';

type NotificationIOSProps = {
  imageSrc?: ImageSourcePropType;
  title?: string;
  subtitle?: string;
  body?: string;
  timestamp?: string;
};

const NotificationIOS: React.FunctionComponent<NotificationIOSProps> = ({
  imageSrc = {
    uri: 'https://reactnative.dev/docs/assets/favicon.png',
  },
  title = name,
  subtitle = 'Tap to expand',
  body = 'Incididunt pariatur non amet non est eiusmod id incididunt occaecat amet Lorem. Eu veniam dolore incididunt consequat.',
  timestamp = 'now',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  let numberOfLines = 1;
  if (isExpanded) {
    numberOfLines = 0;
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
          <Image source={imageSrc} style={styles.image} />
          <View style={styles.column}>
            <View style={styles.innerRow}>
              <Text style={styles.title} numberOfLines={numberOfLines}>
                {title}
              </Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
            <Text style={styles.subtitle} numberOfLines={numberOfLines}>
              {subtitle}
            </Text>
            <Text style={styles.body} numberOfLines={numberOfLines}>
              {body}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    margin: 4,
  },
  view: {
    padding: 8,
    backgroundColor: '#EDEDED',
    borderRadius: 16,
  },
  innerRow: {
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  timestamp: {
    fontSize: 12,
    marginHorizontal: 6,
    fontWeight: '300',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  body: {
    fontSize: 14,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 4,
  },
});

export default NotificationIOS;
