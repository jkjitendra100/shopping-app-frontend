/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ScrollView,
} from 'react-native';
import React, { useRef, useState } from 'react';
import Header from '../components/global/Header';
import MyButton from '../components/global/MyButton';
import axios from 'axios';
import { server } from '../server';
import { Colors } from '../theme/Colors';
import Hero from '../components/home/Hero';
import Fantasies from '../components/home/Fantasies.jsx';
import { useSelector } from 'react-redux';
import { containerStyle } from '../styles/global';
import MyTitle from '../components/global/MyTitle';
import MatchesData from '../components/admin/matches/MatchesData';

export default function HomeScreen() {
  const { loading, user } = useSelector((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const [sync, setSync] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setSync(sync + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  return (
    <>
      <Header home title="Fantasy App" />
      <Hero />
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <MatchesData />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
