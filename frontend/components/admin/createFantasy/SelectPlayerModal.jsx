import {
  StyleSheet,
  Text,
  Modal,
  ScrollView,
  Alert,
  TouchableOpacity,
  View,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import MyTitle from '../../global/MyTitle';
import { Colors } from '../../../theme/Colors';
import axios from 'axios';
import { server } from '../../../server';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import Loading from '../../global/Loading';
import PlayerCard from '../../players/PlayerCard';
import MyButton from '../../global/MyButton';

export default function SelectPlayerModal({
  visible,
  setVisible,
  selectedPlayers,
  setSelectedPlayers,
}) {
  const [playersList, setPlayersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sync, setSync] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const getPlayers = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${server}/player/all`, {
          withCredentials: true,
        });

        setPlayersList(data.data);
        setLoading(false);
        setRefreshing(false);
      } catch (e) {
        setLoading(false);
        setRefreshing(false);
        if (!e.response) return alert('No internet connection');
        Alert.alert('Network error', e.response.data.message);
      }
    };
    getPlayers();
  }, [sync]);

  const handleOnPressCheckBox = (id) => {
    if (selectedPlayers?.find((e) => e.playerId === id)) {
      let tempArr = selectedPlayers?.filter((e) => e?.playerId !== id);
      setSelectedPlayers(tempArr);
    } else {
      setSelectedPlayers([...selectedPlayers, { playerId: id }]);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setSync((state) => state + 1);
  }, []);

  console.log(sync);

  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={styles.container} />
      <View style={styles.body}>
        {/* Heading and close button */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <MyTitle title="Select players" />
          <TouchableOpacity onPress={() => setVisible(false)}>
            <Text style={{ fontSize: 20, color: Colors.red }}>X</Text>
          </TouchableOpacity>
        </View>

        {/* Contents */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {playersList.map((item, index) => (
            <PlayerCard
              key={item?._id}
              name={item.name}
              game={item?.game}
              team={item?.team}
              country={item?.country}
              createdAt={item?.createdAt}
              selectable
              check={selectedPlayers?.find((e) =>
                e?.playerId === item?._id ? true : false
              )}
              onPressSelectable={() => handleOnPressCheckBox(item?._id)}
            />
          ))}
        </ScrollView>
        <MyButton title="NEXT >>>" onPress={() => setVisible(false)} />
        {loading && <Loading />}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayLight,
    opacity: 0.7,
    padding: 20,
    zIndex: 1,
    flex: 1,
    paddingVertical: 20,
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  body: {
    backgroundColor: Colors.white,
    zIndex: 2,
    borderWidth: 2,
    borderColor: Colors.grayLight,
    height: '100%',
    padding: 10,
    borderRadius: 10,
    opacity: 1,
    marginHorizontal: 20,
    marginVertical: 50,
    flex: 1,
    elevation: 1,
  },
});
