import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import SelectPlayerModal from './SelectPlayerModal';
import { Colors } from '../../../theme/Colors';
import MyTextInput from '../../global/MyTextInput';
import MyTitle from '../../global/MyTitle';
import MyButton from '../../global/MyButton';
import CancelButton from '../../global/CancelButton';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { server } from '../../../server';

export default function NewFantasyForm({
  selectedPlayerModal = true,
  setSelectedPlayerModal,
}) {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [maxSelectablePlayers, setMaxSelectablePlayers] = useState(0);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCancelButton = () => {
    Alert.alert('Alert', 'Are you sure you want to leave this page?', [
      { text: 'Cancel' },
      { text: 'Yes', onPress: () => navigation.goBack() },
    ]);
  };

  const createFantasyHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${server}/fantasy/new`,
        {
          fantasyName: name,
          fantasyPrice: Number(price),
          maxSelectablePlayers: Number(maxSelectablePlayers),
          players: selectedPlayers,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      setLoading(false);
      Alert.alert('Success', 'Fantasy created successfully', [
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
    <View>
      {/* Modal */}
      <SelectPlayerModal
        visible={selectedPlayerModal}
        setVisible={setSelectedPlayerModal}
        selectedPlayers={selectedPlayers}
        setSelectedPlayers={setSelectedPlayers}
      />

      {/* Form */}
      <View style={styles.form}>
        <MyTitle title="Please fill all the fields" />
        <MyTextInput
          placeholder="Fantasy name"
          value={name}
          onChangeText={setName}
        />

        <MyTextInput
          placeholder="Fantasy Price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <MyTextInput
          placeholder="Maximum selectable players"
          value={maxSelectablePlayers}
          onChangeText={setMaxSelectablePlayers}
          keyboardType="numeric"
        />

        <View style={{ marginTop: 10, marginLeft: 20 }}>
          <MyTitle
            title={`Number of selected players: ${selectedPlayers?.length}`}
          />
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.selectPlayerBtn}
          onPress={() => setSelectedPlayerModal(true)}
        >
          <Text style={{ color: Colors.blue, textAlign: 'center' }}>
            Select Players
          </Text>
        </TouchableOpacity>

        <View style={styles.buttons}>
          <MyButton
            title="Create Fantasy"
            onPress={createFantasyHandler}
            loading={loading}
          />
          <CancelButton onPress={handleCancelButton} />
        </View>
      </View>
    </View>
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
    marginTop: 20,
    backgroundColor: Colors.white,
    borderRadius: 100,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: Colors.blue,
  },
});
