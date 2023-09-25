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
import Fantasies from '../components/home/Fantasies';
import { useSelector } from 'react-redux';
import { containerStyle } from '../styles/global';

export default function HomeScreen() {
  const { loading } = useSelector((state) => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const [sync, setSync] = useState(0);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setSync(sync + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  }, []);

  console.log(loading);

  const loginTest = async () => {
    try {
      console.log('Hello i am from home page');

      const { data } = await axios.post(
        `${server}/user/login`,
        {
          email: 'user@gmail.com',
          password: '123456',
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('data', data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header home title="Fantasy App" />
      <Hero />
      {/* <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      > */}
      <View style={{ flex: 1 }}>
        <Fantasies sync={sync} />
      </View>

      <MyButton title="LOGIN TEST" onPress={loginTest} loading={loading} />
      {/* </ScrollView> */}
    </>
  );
}

const styles = StyleSheet.create({});
