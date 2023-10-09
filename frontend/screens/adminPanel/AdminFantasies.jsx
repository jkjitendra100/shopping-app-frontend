import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../components/global/Header';
import { bodyStyle, containerStyle } from '../../styles/global';
import Fantasies from '../../components/home/Fantasies.jsx';

export default function AdminFantasies({ navigation }) {
  return (
    <>
      <Header back title="Fantasies" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <Fantasies />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
