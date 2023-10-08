import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { cardStyle } from '../../styles/global';
import MyDataRow from '../../components/global/MyDataRow';
import MyTitle from '../../components/global/MyTitle';
import axios from 'axios';
import { server } from '../../server';
import { Colors } from '../../theme/Colors';
import { Country } from 'country-state-city';
import MyButton from '../global/MyButton';
import PlayerCard from '../players/PlayerCard';
import { countriesList } from '../../jsonFiles/countriesList';

export default function MatchData({ matchDetails, navigation }) {
  const [match, setMatch] = useState('');
  //
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sync, setSync] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${server}/match/${matchDetails?._id}`,
        headers: {},
      };

      await axios
        .request(config)
        .then((res) => {
          setLoading(false);
          setRefreshing(false);
          setMatch(res?.data?.data);
        })
        .catch((e) => {
          setLoading(false);
          setRefreshing(false);
          if (!e.response)
            return Alert.alert('No internet connection available');
        });
    };

    getData();
  }, [sync, matchDetails?._id]);

  const onRefresh = useCallback(() => {
    setSync((state) => state + 1);
    setRefreshing(true);
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={{ marginVertical: 10 }}>
        <View>
          <View style={cardStyle}>
            <Text style={styles.matchName}>{matchDetails?.matchName}</Text>
            <View style={styles.countryView}>
              <View style={styles.flagView}>
                <Image
                  style={{ width: 75, height: 75 }}
                  source={
                    countriesList?.find(
                      (e) => e?.isoCode === matchDetails?.team1Country
                    )?.flag
                  }
                />
                <Text style={styles.countryName}>
                  {
                    Country.getAllCountries()?.find(
                      (e) => e?.isoCode === matchDetails?.team1Country
                    )?.name
                  }
                </Text>
              </View>
              <Text
                style={{
                  marginTop: 20,
                  fontSize: 25,
                  fontWeight: 'bold',
                  color: Colors.rose,
                }}
              >
                Vs
              </Text>
              <View style={styles.flagView}>
                <Image
                  style={{ width: 75, height: 75 }}
                  source={
                    countriesList?.find(
                      (e) => e?.isoCode === matchDetails?.team2Country
                    )?.flag
                  }
                />
                <Text style={styles.countryName}>
                  {
                    Country.getAllCountries()?.find(
                      (e) => e?.isoCode === matchDetails?.team2Country
                    )?.name
                  }
                </Text>
              </View>
            </View>
          </View>

          {/* Border */}
          <View
            style={{
              height: 2,
              backgroundColor: Colors.gray,
              marginHorizontal: -10,
              marginVertical: 20,
            }}
          />

          <View style={cardStyle}>
            <MyDataRow label="Sport" value={matchDetails?.sportName} />
            <MyDataRow
              label="Match Time"
              value={new Date(matchDetails?.matchTime)?.toLocaleString('en-In')}
            />
            <MyDataRow label="Entry Fee" value={matchDetails?.entryFee} />
            <MyDataRow
              label="Max Team Players"
              value={matchDetails?.maxSelectablePlayers}
            />

            <MyDataRow
              label="Team 1 Players"
              value={matchDetails?.team1Players?.length}
            />

            <MyDataRow
              label="Team 2 Players"
              value={matchDetails?.team2Players?.length}
            />

            <MyButton
              title="Create My Team"
              style={{ marginTop: 20 }}
              onPress={() =>
                navigation?.navigate('createTeam', { matchDetails: match })
              }
              loading={loading}
            />
          </View>

          {/* Mapping Players */}
          <View style={[cardStyle, { marginTop: 10 }]}>
            <MyTitle
              title={`${
                Country.getAllCountries()?.find(
                  (e) => e?.isoCode === matchDetails?.team1Country
                )?.name
              } Players`}
              style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
            />

            {match?.team1PlayersList?.map((item, index) => (
              <View style={{ marginLeft: 10 }} key={index}>
                <PlayerCard
                  name={`${index + 1}. ${item?.name}`}
                  user={true}
                  style={{ borderWidth: 0, marginVertical: -5 }}
                />
              </View>
            ))}

            <MyTitle
              title={`${
                Country.getAllCountries()?.find(
                  (e) => e?.isoCode === matchDetails?.team2Country
                )?.name
              } Players`}
              style={{
                textDecorationLine: 'underline',
                fontWeight: 'bold',
                marginTop: 10,
              }}
            />

            {match?.team2PlayersList?.map((item, index) => (
              <View style={{ marginLeft: 10 }} index={index}>
                <PlayerCard
                  name={`${index + 1}. ${item?.name}`}
                  user={true}
                  style={{ borderWidth: 0, marginVertical: -5 }}
                />
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  matchName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    textTransform: 'uppercase',
    color: Colors.indigo,
    textDecorationLine: 'underline',
  },
  countryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },

  flagView: {
    flexDirection: 'column',
    width: '40%',
    alignItems: 'center',
  },

  countryName: {
    color: Colors.grayDark,
    textTransform: 'uppercase',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // countryName: {
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   fontSize: 20,
  //   textTransform: 'uppercase',
  // },

  // vs: {
  //   textAlign: 'center',
  //   fontWeight: 'bold',
  //   color: Colors.grayDark,
  //   fontSize: 16,
  //   marginVertical: 10,
  // },
});
