import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/global/Header';
import { containerStyle } from '../styles/global';
import PlayersData from '../components/admin/playersList/PlayersData';

export default function Players() {
  return (
    <>
      <Header title="Players" />
      <View style={containerStyle}>
        <PlayersData />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
