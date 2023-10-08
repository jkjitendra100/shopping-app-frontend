import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/global/Header';
import MatchData from '../components/matchDetails/MatchData';
import { bodyStyle } from '../styles/global';

export default function MatchDetails({ navigation, route }) {
  const { matchData } = route?.params;

  return (
    <>
      <Header back title="Match Details" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <MatchData matchDetails={matchData} navigation={navigation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
