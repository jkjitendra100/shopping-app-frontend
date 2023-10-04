import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../../components/global/Header';
import FloatingActionButton from '../../components/global/FloatingActionButton';
import { containerStyle } from '../../styles/global';
import Fantasies from '../../components/home/Fantasies.jsx';

export default function AdminFantasies({ navigation }) {
  return (
    <>
      <Header back title="Fantasies" />
      <View style={containerStyle}>
        <Fantasies />
        <FloatingActionButton
          onPress={() => navigation.navigate('createFantasy')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
