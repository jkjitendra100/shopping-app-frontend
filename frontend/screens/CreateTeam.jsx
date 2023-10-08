import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/global/Header';
import PlayerCard from '../components/players/PlayerCard';
import MyTitle from '../components/global/MyTitle';
import { Country } from 'country-state-city';
import MyButton from '../components/global/MyButton';
import axios from 'axios';
import { server } from '../server';
import { useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { bodyStyle } from '../styles/global';

export default function CreateTeam({ navigation, route }) {
  const { user } = useSelector((state) => state.user);
  const { matchDetails } = route?.params;
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const selectPlayerHandler = (player) => {
    if (selectedPlayers?.length === 0) {
      setSelectedPlayers([player?._id]);
    }

    if (selectedPlayers?.find((e) => e !== player?._id)) {
      setSelectedPlayers([...selectedPlayers, player?._id]);
    }

    if (selectedPlayers?.find((e) => e === player?._id)) {
      let tempArr = selectedPlayers?.filter((e) => e !== player?._id);
      setSelectedPlayers(tempArr);
    }
  };

  const makePaymentHandler = async () => {
    if (!user) {
      return Alert.alert(
        'Alert ⚠️',
        'You are not logged in, please login to create your team',
        [
          { text: 'CANCEL' },
          {
            text: 'LOGIN',
            onPress: () => navigation.navigate('Login', { screen: 'login' }),
          },
        ]
      );
    }
    try {
      setLoading(true);
      const { data } = await axios.post(`${server}/fantasy/new`, {
        players: selectedPlayers,
        matchId: matchDetails.data._id,
        userId: user?._id,
        amount: matchDetails.data.entryFee,
      });

      navigation?.navigate('payment', {
        params: { fantasy: data?.data, matchDetails },
      });
      setLoading(false);
      console.log(data);
    } catch (e) {
      setLoading(false);
      console.log(e?.response?.data?.message);
      if (!e?.response?.data) return alert('No network available');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e?.response?.data?.message,
      });
    }
  };

  return (
    <>
      <Header title="Create My Team" back />
      <ScrollView
        style={[
          bodyStyle,
          {
            flex: 1,
          },
        ]}
      >
        <View style={{ marginVertical: 10 }}>
          {/* Team 1 */}
          <MyTitle
            title={
              Country.getAllCountries()?.find(
                (e) => e?.isoCode === matchDetails?.data?.team1Country
              )?.name
            }
            style={{ textDecorationLine: 'underline' }}
          />
          {matchDetails?.team1PlayersList?.map((item, index) => (
            <View style={{ marginVertical: 10 }} key={index}>
              <PlayerCard
                name={`${index + 1}. ${item?.name}`}
                user
                selectable
                check={selectedPlayers?.find((e) =>
                  e === item?._id ? true : false
                )}
                onPressSelectable={() => selectPlayerHandler(item)}
              />
            </View>
          ))}

          {/* Team 2 */}
          <MyTitle
            title={
              Country.getAllCountries()?.find(
                (e) => e?.isoCode === matchDetails?.data?.team2Country
              )?.name
            }
            style={{ textDecorationLine: 'underline', marginTop: 20 }}
          />
          {matchDetails?.team2PlayersList?.map((item, index) => (
            <View style={{ marginVertical: 10 }} key={index}>
              <PlayerCard
                name={`${index + 1}. ${item?.name}`}
                user
                selectable
                check={selectedPlayers?.find((e) =>
                  e === item?._id ? true : false
                )}
                onPressSelectable={() => selectPlayerHandler(item)}
              />
            </View>
          ))}

          <MyButton
            title="SUBMIT & NEXT >>>"
            style={{ marginTop: 50 }}
            loading={loading}
            onPress={makePaymentHandler}
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
