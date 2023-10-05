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

export default function MatchDetails({ navigation, route }) {
  const { id } = route?.params;

  return (
    <>
      <Header back title="Match Details" />
      <View style={{ flex: 1 }}>
        <MatchData id={id} navigation={navigation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
