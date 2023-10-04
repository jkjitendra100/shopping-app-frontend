import { StyleSheet, ScrollView, View, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import FantasyCard from './FantasyCard';
import axios from 'axios';
import { server } from '../../server';
import { useNavigation } from '@react-navigation/native';
import Loading from '../global/Loading';

export default function Fantasies() {
  const navigation = useNavigation();
  const [fantasiesList, setFantasiesList] = useState([]);
  const [loading, setLoading] = useState(false);
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
    <View style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        {fantasiesList?.map((item, index) => (
          <FantasyCard
            key={item?._id}
            name={item?.fantasyName}
            price={item?.fantasyPrice}
            maxPlayers={item?.maxSelectablePlayers}
            totalPlayers={item?.players.length}
            onPress={() =>
              navigation.navigate('fantasyDetails', { id: item?._id })
            }
          />
        ))}
      </ScrollView>

      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({});
