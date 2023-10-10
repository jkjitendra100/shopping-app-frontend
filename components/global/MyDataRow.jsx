import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';

export default function MyDataRow({ label, value = '---' }) {
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
    width: '40%',
    fontWeight: '600',
    color: Colors.blue,
    fontSize: 15,
  },

  colon: {
    width: '5%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.blue,
  },

  value: {
    width: '55%',
    textTransform: 'capitalize',
    color: Colors.indigo,
    fontSize: 15,
    textTransform: 'uppercase'
  },
});
