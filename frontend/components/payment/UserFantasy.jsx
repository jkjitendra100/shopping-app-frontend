import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import MyDataRow from '../global/MyDataRow';
import india from '../../assets/countries/india.png';
import { Colors } from '../../theme/Colors';
import { Country } from 'country-state-city';
import { cardStyle } from '../../styles/global';
import PlayerCard from '../players/PlayerCard';
import MyTitle from '../global/MyTitle';
import { countriesList } from '../../jsonFiles/countriesList';

export default function UserFantasy({ matchDetails, fantasy }) {
  const matchPlayers = [
    ...matchDetails?.team1PlayersList,
    ...matchDetails?.team2PlayersList,
  ];

  return (
    <ScrollView>
      <View style={{ marginVertical: 10 }}>
        <View style={cardStyle}>
          <Text style={styles.matchName}>{matchDetails?.data?.matchName}</Text>
          <View style={styles.countryView}>
            <View style={styles.flagView}>
              <Image
                style={{ width: 75, height: 75 }}
                source={
                  countriesList?.find(
                    (e) => e?.isoCode === matchDetails?.data?.team1Country
                  )?.flag
                }
              />
              <Text style={styles.countryName}>
                {
                  Country.getAllCountries()?.find(
                    (e) => e?.isoCode === matchDetails?.data?.team1Country
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
                    (e) => e?.isoCode === matchDetails?.data?.team2Country
                  )?.flag
                }
              />
              <Text style={styles.countryName}>
                {
                  Country.getAllCountries()?.find(
                    (e) => e?.isoCode === matchDetails?.data?.team2Country
                  )?.name
                }
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[
            cardStyle,
            { marginTop: 15, flexDirection: 'column', gap: 10 },
          ]}
        >
          <MyTitle
            title="MATCH DETAILS"
            style={{
              textDecorationLine: 'underline',
              marginBottom: -10,
              color: Colors.rose,
            }}
          />
          <MyDataRow label="Sport Name" value={matchDetails?.data?.sportName} />
          <MyDataRow
            label="Match Time"
            value={new Date(matchDetails?.data?.matchTime)?.toLocaleString(
              'en-In'
            )}
          />
          <MyDataRow label="Entry Fee" value={matchDetails?.data?.entryFee} />
          <MyDataRow
            label="Selected Players"
            value={fantasy?.players?.length}
          />
          {/* Map selected players */}
        </View>

        <View
          style={[
            cardStyle,
            { marginTop: 15, flexDirection: 'column', gap: 10 },
          ]}
        >
          <MyTitle
            title="YOUR TEAM PLAYERS"
            style={{
              textDecorationLine: 'underline',
              marginBottom: -10,
              color: Colors.rose,
            }}
          />
          {fantasy?.players?.map((item, index) => (
            <View key={index}>
              <PlayerCard
                user
                name={`${index + 1}. ${
                  matchPlayers?.find((e) => e?._id === item)?.name
                }`}
                style={{ borderWidth: 0, marginVertical: -10 }}
              />
            </View>
          ))}
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
});
