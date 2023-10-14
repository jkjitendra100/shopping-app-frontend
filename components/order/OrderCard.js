import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import MyDataRow from '../global/MyDataRow';
import { Colors } from '../../theme/Colors';

export default function OrderCard({
  name,
  price,
  quantity,
  status,
  orderedAt,
  image,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
        <Image
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={image}
        />
        <View >
          <MyDataRow label="Name" value={name} />
          <MyDataRow label="Price" value={price} />
          <MyDataRow label="Quantity" value={quantity} />
          <MyDataRow label="Status" value={status} />
          <MyDataRow label="Ordered At" value={orderedAt} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Colors.grayLight,
    backgroundColor: Colors.white,
    borderRadius: 5,
    elevation: 2,
    marginVertical: 5,
    padding: 10,
  },
});
