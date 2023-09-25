import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import FantasyCard from './FantasyCard';
import axios from 'axios';
import { server } from '../../server';
import { useNavigation } from '@react-navigation/native';
import Loading from '../global/Loading';

export default function Fantasies({ sync }) {
  const navigation = useNavigation();
  const [fantasiesList, setFantasiesList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await axios.get(`${server}/fantasy/all`, {
          withCredentials: true,
        });
        setFantasiesList(data.data.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        if (!e.response) return alert('No network available');
        alert(e?.response?.data?.message);
      }
    };

    fetchData();
  }, [sync]);

  console.log(loading);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
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
