import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import FantasyCard from '../global/FantasyCard';
import NoFantasy from './NoFantasy';
import axios from 'axios';
import { server } from '../../server';
import Toast from 'react-native-toast-message';
import Loading from '../global/Loading';
import { useSelector } from 'react-redux';
import { countriesList } from '../../jsonFiles/countriesList';

export default function MyFantasiesData() {
  const { user } = useSelector((state) => state.user);
  const [fantasies, setFantasies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sync, setSync] = useState(0);

  useEffect(() => {
    if (!user?._id) return alert('Please login first to get your records');
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/fantasy/my/${user?._id}`);

        setFantasies(data?.data);
        setLoading(false);
        setRefreshing(false);
      } catch (e) {
        setRefreshing(false);
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
  }, [sync]);

  const onRefresh = useCallback(() => {
    setSync((state) => state + 1);
    setRefreshing(true);
  }, []);

  console.log(fantasies[0]);

  return (
    <View style={{ height: '100%' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {fantasies?.map((item, index) => (
          <FantasyCard
            key={index}
            matchName={item?.matchData?.matchName}
            sportName={item?.matchData?.sportName}
            matchTime={new Date(item?.matchData?.matchTime).toLocaleString(
              'en-in'
            )}
            amount={item?.fantasyData?.amount}
            paymentStatus={item?.fantasyData?.paymentStatus}
            team1Country={
              countriesList?.find(
                (e) => e?.isoCode === item?.matchData?.team1Country
              )?.name
            }
            team2Country={
              countriesList?.find(
                (e) => e?.isoCode === item?.matchData?.team2Country
              )?.name
            }
          />
        ))}
        {/* <NoFantasy /> */}
      </ScrollView>
      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({});
