import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { titleStyle } from '../../styles/global';
import { Colors } from '../../theme/Colors';

export default function MyTitle({ title = 'Your Title', style }) {
  return <Text style={[styles.titleStyle, style]}>{title}</Text>;
}

const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: '500',
    color: Colors.blue,
    fontSize: 16,
    padding: 10,
  },
});
