import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const Item = ({item}) => {
  return (
    <View style={styles.item}>
      {item.map(image => {
        <Image style={styles.image} source={{uri: image.url}} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: 300,
    height: 250,
    resizeMode: 'contain',
  },
});

export default Item;
