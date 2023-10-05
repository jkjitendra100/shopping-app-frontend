import {
  Alert,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { cardStyle, containerStyle } from '../../styles/global';
import MyDataRow from '../../components/global/MyDataRow';
import MyTitle from '../../components/global/MyTitle';
import axios from 'axios';
import { server } from '../../server';
import Loading from '../../components/global/Loading';
import { Colors } from '../../theme/Colors';
import { Country } from 'country-state-city';
import MyButton from '../global/MyButton';
import PlayerCard from '../players/PlayerCard';

export default function MatchData({ id, navigation }) {
  const [matchDetails, setMatchDetails] = useState('');
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
        url: `${server}/match/${id}`,
        headers: {},
      };

      await axios
        .request(config)
        .then((res) => {
          setLoading(false);
          setRefreshing(false);
          setMatchDetails(res?.data?.data);
        })
        .catch((e) => {
          setLoading(false);
          setRefreshing(false);
          if (!e.response)
            return Alert.alert('No internet connection available');
        });
    };

    getData();
  }, [sync]);

  const onRefresh = useCallback(() => {
    setSync((state) => state + 1);
    setRefreshing(true);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View>
          <View style={cardStyle}>
            <Text
              style={{
                textTransform: 'uppercase',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 24,
                marginTop: 0,
                color: Colors.indigo,
                marginBottom: 10,
              }}
            >
              {matchDetails?.data?.matchName}
            </Text>

            {/* Countries Name */}
            <View>
              <Text
                style={[
                  styles.countryName,
                  {
                    color: Colors.rose,
                  },
                ]}
              >
                {
                  Country.getAllCountries()?.find(
                    (e) => e?.isoCode === matchDetails?.data?.team1Country
                  )?.name
                }
              </Text>

              <Text style={styles.vs}>Vs</Text>

              <Text
                style={[
                  styles.countryName,
                  {
                    color: Colors.green,
                  },
                ]}
              >
                {
                  Country.getAllCountries()?.find(
                    (e) => e?.isoCode === matchDetails?.data?.team2Country
                  )?.name
                }
              </Text>
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
              <MyDataRow label="Sport" value={matchDetails?.data?.sportName} />
              <MyDataRow
                label="Match Time"
                value={new Date(matchDetails?.data?.matchTime)?.toLocaleString(
                  'en-In'
                )}
              />
              <MyDataRow
                label="Entry Fee"
                value={matchDetails?.data?.entryFee}
              />
              <MyDataRow
                label="Max Team Players"
                value={matchDetails?.data?.maxSelectablePlayers}
              />

              <MyDataRow
                label="Team 1 Players"
                value={matchDetails?.data?.team1Players?.length}
              />

              <MyDataRow
                label="Team 2 Players"
                value={matchDetails?.data?.team2Players?.length}
              />

              <MyButton
                title="Create My Team"
                style={{ marginTop: 20 }}
                onPress={() =>
                  navigation?.navigate('createTeam', {
                    params: { matchDetails },
                  })
                }
              />
            </View>

            {/* Mapping Players */}
            <View style={[cardStyle, { marginTop: 10 }]}>
              <MyTitle
                title={`${
                  Country.getAllCountries()?.find(
                    (e) => e?.isoCode === matchDetails?.data?.team1Country
                  )?.name
                } Players`}
                style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}
              />

              {matchDetails?.team1PlayersList?.map((item, index) => (
                <View style={{ marginLeft: 10 }}>
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
                    (e) => e?.isoCode === matchDetails?.data?.team2Country
                  )?.name
                } Players`}
                style={{
                  textDecorationLine: 'underline',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}
              />

              {matchDetails?.team2PlayersList?.map((item, index) => (
                <View style={{ marginLeft: 10 }}>
                  <PlayerCard
                    name={`${index + 1}. ${item?.name}`}
                    user={true}
                    style={{ borderWidth: 0, marginVertical: -5 }}
                  />
                </View>
              ))}
            </View>
          </View>

          {/* Loading */}
          {loading && <Loading />}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  countryName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },

  vs: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: Colors.grayDark,
    fontSize: 16,
    marginVertical: 10,
  },
});
