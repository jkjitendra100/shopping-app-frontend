import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function AdminProducts({ products }) {
  return (
    <View>
      {products?.map((item, index) => (
        <View>
          <Text>{item?._id}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({});
