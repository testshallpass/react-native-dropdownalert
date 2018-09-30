import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import { items } from './constants';

export default class List extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <FlatList
        keyExtractor={item => item.type}
        data={items}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity style={[styles.button, { borderColor: item.backgroundColor }]} onPress={() => this.props.onSelect({ item, index })}>
              <Text style={[styles.text, { color: item.backgroundColor }]}>{item.type}</Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 8,
    margin: 8,
    borderWidth: 1,
  },
  text: {
    margin: 8,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
