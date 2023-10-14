import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';

export default function ProductCard({ image, name, price, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={onPress}
    >
      <View style={styles.imageView}>
        <Image style={styles.image} source={{ uri: image?.url }} />
      </View>

      <View style={{ padding: 5 }}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.name}>Rs:{price}/-</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: Colors.grayLight,
    elevation: 2,
    backgroundColor: Colors.white,
  },
  imageView: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderWidth: 1,
    borderColor: Colors.grayLight,
    elevation: 1,
    padding: 10,
  },

  name: {
    fontWeight: 'bold',
    color: Colors.black,
    textTransform: 'capitalize',
  },
});
