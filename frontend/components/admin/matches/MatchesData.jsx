import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { server } from '../../../server';
import Toast from 'react-native-toast-message';
import MatchCard from './MatchCard';
import { Country } from 'country-state-city';
import Loading from '../../global/Loading';
import { Colors } from '../../../theme/Colors';
import { useNavigation } from '@react-navigation/native';

export default function MatchesData() {
  const navigation = useNavigation();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sync, setSync] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${server}/match/all`);
        setLoading(false);
        setRefreshing(false);
        setMatches(data.data);
      } catch (e) {
        setLoading(false);
        setRefreshing(false);
        if (!e?.response?.data) return alert('No network available!');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: e?.response?.data?.message,
        });
      }
    };

    getData();
  }, [sync]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);
    setSync((state) => state + 1);
  }, [sync]);

  return (
    <View style={{ flex: 1, marginHorizontal: 10 }}>
      <ScrollView
        style={{ marginTop: 5 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {matches?.map((item, index) => (
          <View>
            <MatchCard
              key={item?._id}
              matchName={item?.matchName}
              matchTime={`${new Date(item?.matchTime)?.toDateString(
                'en-In'
              )}\n${new Date(item?.matchTime)?.toLocaleTimeString('en-In')}`}
              sportName={item?.sportName}
              team1Country={
                Country?.getAllCountries()?.find(
                  (e) => e.isoCode === item?.team1Country
                )?.name
              }
              team2Country={
                Country?.getAllCountries()?.find(
                  (e) => e.isoCode === item?.team2Country
                )?.name
              }
              onPress={() =>
                navigation.navigate('matchDetails', { id: item?._id })
              }
            />
            {index !== matches.length - 1 && (
              <View
                style={{
                  height: 4,
                  backgroundColor: Colors.gray,
                  margin: 10,
                  marginTop: 13,
                }}
              />
            )}
          </View>
        ))}
      </ScrollView>
      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({});
