import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList, Image, StatusBar, View } from 'react-native';
import DropdownAlert from 'react-native-dropdownalert';
import { items, MAIN_CUSTOM_COLOR } from './constants';

export default class main extends Component {
  constructor(props) {
    super(props);
  }
  itemAction(item) {
    switch (item.type) {
      case 'close':
        this.closeAction();
        break;
      default:
        const random = Math.floor(Math.random() * 1000 + 1);
        const title = item.type + ' #' + random;
        this.dropdown.alertWithType(item.type, title, item.message);
    }
  }
  closeAction() {
    this.dropdown.close();
  }
  handleClose(data) {
    console.log(data);
  }
  handleCancel(data) {
    console.log(data);
  }
  renderItem({ item, index }) {
    return (
      <TouchableOpacity style={[styles.button, { borderColor: item.backgroundColor }]} onPress={() => this.itemAction(item)}>
        <Text style={[styles.text, { color: item.backgroundColor }]}>{item.type}</Text>
      </TouchableOpacity>
    );
  }
  renderImage(props) {
    return (
      <Image style={props.imageStyle} source={{ uri: props.imageSrc }} />
    );
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        <FlatList style={styles.listContainer} keyExtractor={item => item.type} data={items} renderItem={({ item, index }) => this.renderItem({ item, index })} />
        <DropdownAlert
          ref={ref => this.dropdown = ref}
          containerStyle={{
            backgroundColor: MAIN_CUSTOM_COLOR,
          }}
          showCancel={true}
          onClose={data => this.handleClose(data)}
          onCancel={data => this.handleCancel(data)}
          imageSrc={'https://facebook.github.io/react-native/docs/assets/favicon.png'}
          renderImage={(props) => this.renderImage(props)}
          renderCancel={(props) => this.renderImage(props)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listContainer: {
    paddingTop: 22,
  },
  button: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 8,
    margin: 8,
    borderWidth: 1,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
});
