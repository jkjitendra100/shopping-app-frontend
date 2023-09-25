import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/global/Header';
import { containerStyle } from '../styles/global';
import PlayerCard from '../components/players/PlayerCard';

export default function Players() {
  return (
    <>
      <Header title="Players" />
      <View style={containerStyle}>
        <PlayerCard />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
