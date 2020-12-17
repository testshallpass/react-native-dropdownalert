import React from 'react';
import {StyleSheet, Text, Pressable, FlatList} from 'react-native';

const Button = ({
  item = {title: '', type: '', color: '#202020'},
  onSelect = () => {},
}) => {
  const text = item.title ? item.title : item.type;
  return (
    <Pressable
      style={[styles.button, {borderColor: item.color}]}
      onPress={() => onSelect({item})}>
      <Text style={[styles.text, {color: item.color}]}>{text}</Text>
    </Pressable>
  );
};

const List = ({items = [], onSelect = () => {}}) => {
  return (
    <FlatList
      keyExtractor={(item) => item.type}
      data={items}
      numColumns={3}
      renderItem={({item}) => {
        return <Button item={item} onSelect={onSelect} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    borderRadius: 8,
    margin: 4,
    borderWidth: 1,
  },
  text: {
    margin: 8,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default List;
