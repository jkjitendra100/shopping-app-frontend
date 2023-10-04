import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function PlayerCard({
  name = 'Player Name',
  game,
  team,
  country,
  createdAt,
  selectable = false,
  onPressSelectable,
  check = false,
}) {
  return (
    <View style={styles.container}>
      {selectable && (
        <TouchableOpacity style={styles.checkBox} onPress={onPressSelectable}>
          {check ? (
            <AntDesign name="checksquare" size={25} color={Colors.blue} />
          ) : (
            <Ionicons name="square-outline" size={25} />
          )}
        </TouchableOpacity>
      )}
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Text style={styles.key}>Name</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{name}</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Text style={styles.key}>Game</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{game}</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Text style={styles.key}>Team</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{team}</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Text style={styles.key}>Country</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{country}</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Text style={styles.key}>Created At</Text>
        <Text style={styles.colon}>:</Text>
        <Text style={styles.value}>{createdAt}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: 'column',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    elevation: 3,
  },

  checkBox: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 2,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  key: { width: '25%', lineHeight: 14 },
  colon: { width: '5%', lineHeight: 14 },
  value: { width: '70%', lineHeight: 14 },
});
