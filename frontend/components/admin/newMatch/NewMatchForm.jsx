import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../../theme/Colors';
import MyTitle from '../../global/MyTitle';
import MyButton from '../../global/MyButton';
import CancelButton from '../../global/CancelButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { server } from '../../../server';
import SelectPlayerModal from '../createFantasy/SelectPlayerModal';
import { Picker } from '@react-native-picker/picker';
import { Country } from 'country-state-city';
import { inputStyle } from '../../../styles/global';
import DatePicker from 'react-native-date-picker';
import { sportsList } from '../../../jsonFiles/sportsList';
import MyTextInput from '../../global/MyTextInput';

export default function NewMatchForm() {
  const navigation = useNavigation();
  const [team1Country, setTeam1Country] = useState('');
  const [team2Country, setTeam2Country] = useState('');
  const [team1Players, setTeam1Players] = useState([]);
  const [team2Players, setTeam2Players] = useState([]);
  const [matchTime, setMatchTime] = useState(new Date());
  const [sportName, setSportName] = useState('');
  const [matchName, setMatchName] = useState('');
  const [maxSelectablePlayers, setMaxSelectablePlayers] = useState('');
  const [entryFee, setEntryFee] = useState('');
  //
  const [loading, setLoading] = useState(false);

  //
  const [team1PlayersModal, setTeam1PlayersModal] = useState(false);
  const [team2PlayersModal, setTeam2PlayersModal] = useState(false);

  const handleCancelButton = () => {
    Alert.alert('Alert', 'Are you sure you want to leave this page?', [
      { text: 'Cancel' },
      { text: 'Yes', onPress: () => navigation.goBack() },
    ]);
  };

  const addNewMatchHandler = async () => {
    if (!team1Country) return alert('Please select team 1 country');
    if (!team2Country) return alert('Please select team 2 country');
    if (team1Players?.length <= 0) return alert('Please select team 1 players');
    if (team2Players?.length <= 0) return alert('Please select team 2 players');
    if (!sportName) return alert('Please select sport');
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/match/new`,
        {
          team1Country,
          team2Country,
          team1Players,
          team2Players,
          sportName,
          matchName,
          matchTime: Date.parse(matchTime),
          entryFee,
          maxSelectablePlayers,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      setLoading(false);
      Alert.alert('Success', 'Match Added successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      if (!e?.response) return alert('No internet connection');
      setLoading(false);
      console.log(e);
      alert(e?.response?.data?.message);
    }
  };

  return (
    <ScrollView>
      {/* Modal */}
      <SelectPlayerModal
        visible={team1PlayersModal}
        setVisible={setTeam1PlayersModal}
        selectedPlayers={team1Players}
        setSelectedPlayers={setTeam1Players}
      />

      <SelectPlayerModal
        visible={team2PlayersModal}
        setVisible={setTeam2PlayersModal}
        selectedPlayers={team2Players}
        setSelectedPlayers={setTeam2Players}
      />

      {/* Form */}
      <View>
        <View style={styles.form}>
          <MyTitle title="MATCH DATE & TIME" />
          <DatePicker
            date={matchTime}
            onDateChange={setMatchTime}
            mode="datetime"
            title="Select date"
            minimumDate={new Date(Date.now())}
          />
        </View>

        <View style={styles.form}>
          <MyTitle title="TEAM 1" />
          <View style={[inputStyle, { padding: 0 }]}>
            <Picker
              selectedValue={team1Country}
              onValueChange={(itemValue, itemIndex) =>
                setTeam1Country(itemValue)
              }
              mode="dialog"
            >
              <Picker.Item
                label="--- SELECT COUNTRY ---"
                value={''}
                style={{ fontSize: 14 }}
              />
              {Country.getAllCountries()
                ?.filter((e) => e?.isoCode !== team2Country)
                ?.map((item) => (
                  <Picker.Item
                    key={item?.isoCode}
                    label={item?.name}
                    value={item?.isoCode}
                    style={{ fontSize: 14 }}
                  />
                ))}
            </Picker>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.selectPlayerBtn}
            onPress={() => setTeam1PlayersModal(true)}
          >
            <Text style={{ color: Colors.blue, textAlign: 'center' }}>
              Select Team 1 Players
            </Text>
          </TouchableOpacity>

          <MyTitle
            style={{ color: Colors.rose, textAlign: 'center', marginTop: 10 }}
            title={`No of Players Selected: ${team1Players.length}`}
          />
        </View>

        <View style={styles.form}>
          <MyTitle title="TEAM 2" />
          <View style={[inputStyle, { padding: 0 }]}>
            <Picker
              selectedValue={team2Country}
              onValueChange={(itemValue, itemIndex) =>
                setTeam2Country(itemValue)
              }
              mode="dialog"
            >
              <Picker.Item
                label="--- SELECT COUNTRY ---"
                value={''}
                style={{ fontSize: 14 }}
              />
              {Country.getAllCountries()
                ?.filter((e) => e?.isoCode !== team1Country)
                ?.map((item) => (
                  <Picker.Item
                    key={item?.isoCode}
                    label={item?.name}
                    value={item?.isoCode}
                    style={{ fontSize: 14 }}
                  />
                ))}
            </Picker>
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.selectPlayerBtn}
            onPress={() => setTeam2PlayersModal(true)}
          >
            <Text style={{ color: Colors.blue, textAlign: 'center' }}>
              Select Team 2 Players
            </Text>
          </TouchableOpacity>
          <MyTitle
            style={{ color: Colors.rose, textAlign: 'center', marginTop: 10 }}
            title={`No of Players Selected: ${team2Players.length}`}
          />
        </View>

        <View style={styles.form}>
          <MyTitle title="SELECT SPORT" />
          <View style={[inputStyle, { padding: 0 }]}>
            <Picker
              selectedValue={sportName}
              onValueChange={(itemValue, itemIndex) => setSportName(itemValue)}
              mode="dialog"
            >
              <Picker.Item
                label="--- SELECT SPORT ---"
                value={''}
                style={{ fontSize: 14 }}
              />
              {sportsList?.map((item, index) => (
                <Picker.Item
                  key={item?.index}
                  label={item?.name}
                  value={item?.slug}
                  style={{ fontSize: 14 }}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.form}>
          <MyTitle title="MATCH NAME" />
          <MyTextInput
            value={matchName}
            onChangeText={setMatchName}
            placeholder="Enter match name"
          />
        </View>

        <View style={styles.form}>
          <MyTitle title="OTHER DETAILS" />
          <MyTextInput
            value={entryFee}
            onChangeText={setEntryFee}
            placeholder="Enter entry fee"
            keyboardType="numeric"
          />

          <MyTextInput
            value={maxSelectablePlayers}
            onChangeText={setMaxSelectablePlayers}
            placeholder="Enter max selectable players"
            keyboardType="numeric"
          />
        </View>

        <View>
          <MyTitle
            style={[styles.teamName, { color: Colors.fuchsia }]}
            title={`${
              team1Country
                ? Country.getAllCountries()?.find(
                    (e) => e?.isoCode === team1Country
                  )?.name
                : '---'
            }`}
          />
          <Text
            style={styles.noOfPlayers}
          >{`(${team1Players?.length} Players)`}</Text>
        </View>
        <MyTitle
          title="Vs"
          style={{ color: Colors.slate, textAlign: 'center', fontSize: 20 }}
        />
        <View>
          <MyTitle
            style={styles.teamName}
            title={`${
              team2Country
                ? Country.getAllCountries()?.find(
                    (e) => e?.isoCode === team2Country
                  )?.name
                : '---'
            }`}
          />
          <Text
            style={[styles.noOfPlayers, { color: Colors.green }]}
          >{`(${team2Players?.length} Players}`}</Text>
        </View>

        <MyTitle
          style={styles.matchTime}
          title={`MATCH TIME\n${matchTime?.toLocaleString('en-In')}`}
        />

        <View style={styles.buttons}>
          <MyButton
            title="Add Match"
            onPress={addNewMatchHandler}
            loading={loading}
          />
          <CancelButton onPress={handleCancelButton} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    padding: 10,
    backgroundColor: Colors.white,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: Colors.grayLight,
    elevation: 2,
    borderRadius: 10,
  },

  buttons: {
    flexDirection: 'column',
    gap: 20,
    marginTop: 50,
    marginBottom: 20,
  },

  selectPlayerBtn: {
    padding: 10,
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: Colors.white,
    borderRadius: 100,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.blue,
  },

  teamName: {
    color: Colors.green,
    textAlign: 'center',
    fontSize: 32,
    textTransform: 'uppercase',
    fontWeight: '900',
  },

  noOfPlayers: {
    textAlign: 'center',
    color: Colors.fuchsia,
    fontWeight: '600',
    fontSize: 20,
  },

  matchTime: {
    color: Colors.rose,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 30,
    fontWeight: '600',
  },
});
