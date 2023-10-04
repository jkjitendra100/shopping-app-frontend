import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function MyDataRow({ label, value = 'Value' }) {
  return (
    <View style={styles.dataRow}>
      <Text style={styles.key}>{label}</Text>
      <Text style={styles.colon}>:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dataRow: {
    paddingHorizontal: 10,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  key: {
    width: '25%',
    fontWeight: '500',
  },

  colon: {
    width: '5%',
    textAlign: 'center',
  },

  value: {
    width: '70%',
  },
});
