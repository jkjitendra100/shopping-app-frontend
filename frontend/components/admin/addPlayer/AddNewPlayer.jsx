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
import { bodyStyle, inputStyle } from '../../../styles/global';
import { Picker } from '@react-native-picker/picker';
import { sportsList } from '../../../jsonFiles/sportsList';

export default function AddNewPlayer({ navigation }) {
  const [name, setName] = useState('');
  const [game, setGame] = useState('');
  const [team, setTeam] = useState('');
  const [country, setCountry] = useState('IN');
  const [loading, setLoading] = useState(false);

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
          placeholder="Player name*"
          value={name}
          onChangeText={setName}
        />

        <MyTextInput
          placeholder="Enter Team*"
          value={team}
          onChangeText={setTeam}
        />

        <View style={[inputStyle, { padding: 0 }]}>
          <Picker
            selectedValue={game}
            onValueChange={(itemValue, itemIndex) => setGame(itemValue)}
            mode="dialog"
          >
            <Picker.Item
              label="--- SELECT SPORT ---"
              value={''}
              style={{ fontSize: 14 }}
            />
            {sportsList
              ?.sort((a, b) => a?.name.localeCompare(b?.name))
              ?.map((item) => (
                <Picker.Item
                  key={item?.slug}
                  label={item?.name}
                  value={item?.slug}
                  style={{ fontSize: 14 }}
                />
              ))}
          </Picker>
        </View>

        <View style={[inputStyle, { padding: 0 }]}>
          <Picker
            selectedValue={country}
            onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
            mode="dialog"
          >
            <Picker.Item
              label="--- SELECT COUNTRY ---"
              value={''}
              style={{ fontSize: 14 }}
            />
            {Country.getAllCountries()?.map((item) => (
              <Picker.Item
                key={item?.isoCode}
                label={item?.name}
                value={item?.isoCode}
                style={{ fontSize: 14 }}
              />
            ))}
          </Picker>
        </View>

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
