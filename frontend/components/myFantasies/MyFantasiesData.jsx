import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import FantasyCard from '../global/FantasyCard';
import NoFantasy from './NoFantasy';
import axios from 'axios';
import { server } from '../../server';
import Toast from 'react-native-toast-message';
import Loading from '../global/Loading';

export default function MyFantasiesData() {
  const [fantasies, setFantasies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/fantasy/all`);
        
        setFantasies(data?.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        if (!e?.response?.data) return alert('No network available');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: e?.response?.data?.message,
        });
        console.log(e);
      }
    };

    fetchData();
  }, []);
    
    console.log(fantasies[0]);

  return (
    <View style={{ height: '100%' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {fantasies?.map((item, index) => (
          <FantasyCard />
        ))}
        {/* <NoFantasy /> */}
      </ScrollView>
      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({});
