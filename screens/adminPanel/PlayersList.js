import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Players from '../../components/admin/playersList/Players';
import Header from '../../components/global/Header';
import { containerStyle } from '../../styles/global';

export default function PlayersList() {
  return (
    <>
      <Header back title="Players List" />
      <View style={containerStyle}>
        <Players />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
