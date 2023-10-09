import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import FantasyCard from '../global/FantasyCard';
import axios from 'axios';
import { server } from '../../server';
import { useNavigation } from '@react-navigation/native';
import Loading from '../global/Loading';
import { countriesList } from '../../jsonFiles/countriesList';

export default function Fantasies() {
  const navigation = useNavigation();
  const [fantasiesList, setFantasiesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [sync, setSync] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await axios.get(`${server}/fantasy/all`, {
          withCredentials: true,
        });
        setFantasiesList(data.data.data);
        setLoading(false);
        setRefreshing(false);
      } catch (e) {
        setLoading(false);
        setRefreshing(false);
        if (!e.response) return alert('No network available');
        alert(e?.response?.data?.message);
      }
    };

    fetchData();
  }, [sync]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setSync(sync + 1);
  }, [sync]);

  return (
    <View style={{ height: '100%' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {fantasiesList?.map((item, index) => (
          <FantasyCard
            key={index}
            matchName={item?.matchData?.matchName}
            sportName={item?.matchData?.sportName}
            matchTime={new Date(item?.matchData?.matchTime).toLocaleString(
              'en-in'
            )}
            amount={item?.fantasyData?.amount}
            paymentStatus={item?.fantasyData?.paymentStatus}
            fantasyTime={new Date(item?.fantasyData?.createdAt)?.toLocaleString(
              'en-In'
            )}
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
      </ScrollView>

      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({});
