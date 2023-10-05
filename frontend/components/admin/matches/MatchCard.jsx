import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { cardStyle } from '../../../styles/global';
import { Colors } from '../../../theme/Colors';

export default function MatchCard({
  team1Country,
  team2Country,
  matchTime,
  matchName,
  sportName,
  onPress,
}) {
  return (
    <TouchableOpacity style={[cardStyle, styles.container]} onPress={onPress}>
      <Text
        numberOfLines={1}
        style={[
          styles.matchName,
          {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            borderBottomWidth: 2,
          },
        ]}
      >
        {matchName}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <View style={{ width: '25%' }}>
          <Text
            numberOfLines={1}
            style={[styles.teamName, { color: Colors.fuchsia }]}
          >
            {team1Country}
          </Text>
        </View>
        <View style={{ width: '50%' }}>
          <Text numberOfLines={2} style={styles.matchTime}>
            {matchTime}
          </Text>
        </View>
        <View style={{ width: '25%' }}>
          <Text
            numberOfLines={1}
            style={[styles.teamName, { color: Colors.green }]}
          >
            {team2Country}
          </Text>
        </View>
      </View>
      <Text
        numberOfLines={1}
        style={[
          styles.matchName,
          {
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            borderTopWidth: 2,
          },
        ]}
      >
        {sportName}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderWidth: 5,
    borderColor: Colors.gray,
  },

  matchName: {
    padding: 5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    margin: -10,
    borderColor: Colors.grayLight,
    backgroundColor: Colors.grayLight
  },

  teamName: { fontWeight: '600', paddingVertical: 5, fontSize: 16 },

  matchTime: {
    color: Colors.rose,
    textAlign: 'center',
    paddingVertical: 20,
  },
});
