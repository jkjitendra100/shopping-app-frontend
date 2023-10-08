import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { cardStyle } from '../../styles/global';
import { Colors } from '../../theme/Colors';
import { countriesList } from '../../jsonFiles/countriesList';
import Fontisto from 'react-native-vector-icons/Fontisto';

export default function FantasyCard({
  team1Country,
  team2Country,
  matchTime,
  matchName = '---',
  sportName,
  onPress,
  createdAt = Date.now(),
}) {
  console.log(createdAt?.toString()?.substring(5).toLocaleString('en_IN'));
  return (
    <TouchableOpacity style={[cardStyle, styles.container]} onPress={onPress}>
      <View style={styles.header}>
        <Text
          numberOfLines={1}
          style={[
            styles.matchName,
            {
              width: '75%',
              color: Colors.blue,
            },
          ]}
        >
          <Fontisto name="caret-right" /> {matchName}
        </Text>
        <Text
          numberOfLines={1}
          style={[styles.matchName, { color: Colors.rose, fontWeight: '500' }]}
        >
          <Fontisto name="persons" />{' '}
          {createdAt?.toString()?.substring(8).toLocaleString('en_IN')}
        </Text>
      </View>

      {/* Flags */}
      <View style={styles.countryView}>
        {/* Team 1 country */}
        <View style={styles.flagView}>
          <Image
            style={{ width: 50, height: 50 }}
            source={countriesList?.find((e) => e?.name === team1Country)?.flag}
          />
          <Text numberOfLines={1} style={[styles.teamName]}>
            {team1Country}
          </Text>
        </View>

        {/* Time */}
        <View style={{ width: '40%' }}>
          <Text numberOfLines={2} style={styles.matchTime}>
            {matchTime}
          </Text>
          <Text
            numberOfLines={1}
            style={[
              {
                textAlign: 'center',
                width: '100%',
                fontWeight: 'bold',
                color: Colors.gray,
                textTransform: 'uppercase',
                fontSize: 14,
              },
            ]}
          >
            ({sportName})
          </Text>
        </View>

        {/* Team 2 country */}
        <View style={styles.flagView}>
          <Image
            style={{ width: 50, height: 50 }}
            source={countriesList?.find((e) => e?.name === team2Country)?.flag}
          />
          <Text
            numberOfLines={1}
            style={[styles.teamName, { color: Colors.grayDark }]}
          >
            {team2Country}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderWidth: 0.5,
    borderColor: Colors.gray,
    elevation: 5,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.grayLight,
    paddingBottom: 10,
  },

  matchName: {
    padding: 5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    margin: -10,
    borderColor: Colors.grayLight,
    flexDirection: 'row',
    alignItems: 'center',
  },

  teamName: {
    fontWeight: '600',
    paddingVertical: 5,
    fontSize: 14,
    textAlign: 'center',
    color: Colors.grayDark,
  },

  matchTime: {
    color: Colors.rose,
    textAlign: 'center',
    fontSize: 12,
    textTransform: 'uppercase',
  },

  countryView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingHorizontal: 5,
    width: '100%',
  },

  flagView: {
    width: '30%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
