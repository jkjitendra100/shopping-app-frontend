import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/global/Header';
import PlayerCard from '../components/players/PlayerCard';
import { Colors } from '../theme/Colors';
import MyTitle from '../components/global/MyTitle';
import { Country } from 'country-state-city';
import MyButton from '../components/global/MyButton';

export default function CreateTeam({ route }) {
  const { matchDetails } = route?.params?.params;
  const [selectedPlayers, setSelectedPlayers] = useState([]);

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

  return (
    <>
      <Header title="Create My Team" back />
      <ScrollView
        style={{
          backgroundColor: Colors.white,
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
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
          <View style={{ marginVertical: 10 }}>
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
          <View style={{ marginVertical: 10 }}>
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

        <MyButton title="Make Payment" style={{ marginTop: 50 }} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
