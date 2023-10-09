import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MatchesData from '../../components/admin/matches/MatchesData';
import Header from '../../components/global/Header';
import { bodyStyle } from '../../styles/global';

export default function AdminMatches() {
  return (
    <>
      <Header back title="All Players" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <MatchesData />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
