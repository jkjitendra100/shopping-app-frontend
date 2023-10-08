import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyFantasiesData from '../components/myFantasies/MyFantasiesData';
import Header from '../components/global/Header';
import { bodyStyle } from '../styles/global';

export default function MyFantasies() {
  return (
    <>
      <Header back title="My Fantasies" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <MyFantasiesData />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
