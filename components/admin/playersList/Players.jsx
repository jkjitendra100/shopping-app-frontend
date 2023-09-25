import { StyleSheet, ScrollView, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import axios from 'axios';
import { server } from '../../../server';
import PlayerCard from '../../players/PlayerCard';
import Header from '../../global/Header';
import { containerStyle } from '../../../styles/global';
import Loading from '../../global/Loading';

export default function Players() {
  const [playersList, setPlayersList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPlayers = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${server}/player/all`, {
          withCredentials: true,
        });

        setLoading(false);
        setPlayersList(data.data);
      } catch (e) {
        setLoading(false);
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
  }, []);

  return (
    <>
      <View>
        <ScrollView>
          {playersList.map((item) => (
            <View key={item?._id}>
              <PlayerCard
                name={item?.name}
                team={item?.team}
                game={item?.game}
                country={item?.country}
                createdAt={item?.createdAt?.toLocaleString('en-In')}
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
