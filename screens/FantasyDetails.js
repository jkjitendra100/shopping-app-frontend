import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/global/Header';
import FantasyData from '../components/fantasyDetails/FantasyData';

export default function FantasyDetails({ route }) {
  const { id } = route.params;

  return (
    <View>
      <Header back title="Fantasy Details" />
      <FantasyData id={id} />
    </View>
  );
}

const styles = StyleSheet.create({});
