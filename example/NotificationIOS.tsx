import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ImageSourcePropType,
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
  subtitle = 'Information',
  body = 'Ipsum tempor tempor ea occaecat ipsum commodo do minim magna excepteur. Commodo non ex consectetur laboris sunt consequat laborum amet exercitation tempor anim sint cillum.',
  timestamp = 'now',
}) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <View
        style={styles.view}>
        <View style={styles.row}>
          <Image source={imageSrc} style={styles.image} />
          <View style={styles.column}>
            <View style={styles.innerRow}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
            <Text style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </Text>
            <Text style={styles.body} numberOfLines={4}>
              {body}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    margin: 4,
  },
  view: {
    padding: 12,
    backgroundColor: 'gray',
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
    color: 'white',
  },
  title: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  body: {
    fontSize: 14,
    color: 'white',
  },
  image: {
    width: 36,
    height: 36,
    marginRight: 8,
    borderRadius: 8,
  },
});

export default NotificationIOS;
