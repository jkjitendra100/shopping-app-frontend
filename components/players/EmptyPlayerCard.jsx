import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';

export default function EmptyPlayerCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No Players Available</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },

  text: {
    fontSize: 50,
    fontWeight: 'bold',
    color: Colors.gray,
    textAlign: 'center',
  },
});
