import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PlayersData from '../../components/admin/playersList/PlayersData';
import Header from '../../components/global/Header';
import { containerStyle } from '../../styles/global';

export default function PlayersList() {
  return (
    <>
      <Header back title="Players List" />
      <View style={containerStyle}>
        <PlayersData />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
