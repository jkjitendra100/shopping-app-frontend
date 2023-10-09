import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import PlayersData from '../../components/admin/playersList/PlayersData';
import Header from '../../components/global/Header';
import { bodyStyle, containerStyle } from '../../styles/global';

export default function PlayersList() {
  return (
    <>
      <Header back title="Players List" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <PlayersData />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
