import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import { server } from '../../../server';
import PlayerCard from '../../players/PlayerCard';
import Loading from '../../global/Loading';
import { countriesList } from '../../../jsonFiles/countriesList';

export default function PlayersData() {
  const [playersList, setPlayersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sync, setSync] = useState(false);

  useEffect(() => {
    const getPlayers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${server}/player/all`, {
          withCredentials: true,
        });

        setLoading(false);
        setRefreshing(false);
        setPlayersList(data.data);
      } catch (e) {
        setLoading(false);
        setRefreshing(false);
        console.log(e);
        if (!e.response) return alert('No internet connection');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: e.response.data.message,
        });
      }
    };
    getPlayers();
  }, [sync]);

  const onRefresh = useCallback(() => {
    setSync(sync + 1);
    setRefreshing(true);
  }, []);

  return (
    <>
      <View style={{ height: '100%' }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {playersList?.map((item) => (
            <View key={item?._id} style={{ marginVertical: 5 }}>
              <PlayerCard
                name={item?.name}
                game={item?.game}
                country={
                  countriesList?.find((e) => e?.isoCode === item?.country)?.name
                }
                createdAt={new Date(
                  Date.parse(item?.createdAt)
                )?.toLocaleDateString('en-In')}
                flag={
                  countriesList?.find((e) => e?.isoCode === item.country)?.flag
                }
              />
            </View>
          ))}
        </ScrollView>
      </View>
      {loading && <Loading />}
    </>
  );
}

const styles = StyleSheet.create({});
