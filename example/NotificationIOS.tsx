import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { expo } from './app.json';
import { Color } from './Color';

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
  title = expo.name,
  subtitle = 'Information',
  body = 'Ipsum tempor tempor ea occaecat ipsum commodo do minim magna excepteur. Commodo non ex consectetur laboris sunt consequat laborum amet exercitation tempor anim sint cillum.',
  timestamp = 'now',
}) => {
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.view}>
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
  body: {
    color: Color.white,
    fontSize: 14,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  image: {
    borderRadius: 8,
    height: 36,
    marginRight: 8,
    width: 36,
  },
  innerRow: {
    flexDirection: 'row',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  safeView: {
    margin: 4,
  },
  subtitle: {
    color: Color.white,
    fontSize: 14,
    fontWeight: '500',
  },
  timestamp: {
    color: Color.white,
    fontSize: 12,
    fontWeight: '300',
    marginHorizontal: 6,
  },
  title: {
    color: Color.white,
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
  },
  view: {
    backgroundColor: Color.gray,
    borderRadius: 16,
    padding: 12,
  },
});

export default NotificationIOS;
