import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { titleStyle } from '../../styles/global';

export default function MyTitle({ title = 'Your Title' }) {
  return <Text style={titleStyle}>{title}</Text>;
}

const styles = StyleSheet.create({});
