import { StyleSheet, ScrollView, View } from 'react-native';
import React, { useState } from 'react';
import MyTitle from '../../global/MyTitle';
import MyTextInput from '../../global/MyTextInput';
import MyButton from '../../global/MyButton';
import CancelButton from '../../global/CancelButton';
import axios from 'axios';
import { server } from '../../../server';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Country, State, City } from 'country-state-city';
import { bodyStyle } from '../../../styles/global';

export default function AddNewPlayer({ navigation }) {
  const [name, setName] = useState('');
  const [game, setGame] = useState('');
  const [team, setTeam] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  // console.log(Country?.getAllCountries());

  const addPlayerHandler = async () => {
    setLoading(true);
    try {
      console.log(name, game, team, country);
      const data = await axios.post(
        `${server}/player/new`,
        {
          name,
          game,
          team,
          country,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data?.data?.message,
      });
      setLoading(false);
      //   navigation.goBack();
    } catch (e) {
      setLoading(false);
      if (!e?.response) return alert('No network connection ⚠️');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e?.response.data.message,
      });
    }
  };
  return (
    <ScrollView>
      <View style={[bodyStyle, { marginVertical: 10 }]}>
        <MyTitle title="Please fill all the fields" />
        <MyTextInput
          placeholder="Player name"
          value={name}
          onChangeText={setName}
        />
        <MyTextInput
          placeholder="Enter Game"
          value={game}
          onChangeText={setGame}
        />
        <MyTextInput
          placeholder="Enter Team"
          value={team}
          onChangeText={setTeam}
        />
        <MyTextInput
          placeholder="Enter Country"
          value={country}
          onChangeText={setCountry}
        />

        <View style={styles.buttons}>
          <MyButton
            title="+ ADD"
            onPress={addPlayerHandler}
            loading={loading}
          />
          <CancelButton title="CANCEL" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 60,
    marginBottom: 20,
    flexDirection: 'column',
    gap: 20,
  },
});
