import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, FlatList} from 'react-native';
import PropTypes from 'prop-types';

export default class List extends Component {
  static propTypes = {
    items: PropTypes.array,
    onSelect: PropTypes.func,
  };
  static defaultProps = {
    items: [],
    onSelect: () => {},
  };
  render() {
    const {items, onSelect} = this.props;
    return (
      <FlatList
        keyExtractor={item => item.type}
        data={items}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={[styles.button, {borderColor: item.backgroundColor}]}
              onPress={() => onSelect({item, index})}>
              <Text style={[styles.text, {color: item.backgroundColor}]}>
                {item.type}
              </Text>
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
