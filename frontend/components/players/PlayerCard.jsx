import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MyDataRow from '../global/MyDataRow';

export default function PlayerCard({
  name = 'Player Name',
  game,
  team,
  country,
  createdAt,
  selectable = false,
  onPressSelectable,
  check = false,
  style,
  user = false,
  flag,
}) {
  return (
    <View style={[styles.container, style]}>
      {selectable && (
        <TouchableOpacity style={styles.checkBox} onPress={onPressSelectable}>
          {check ? (
            <AntDesign name="checksquare" size={25} color={Colors.blue} />
          ) : (
            <Ionicons name="square-outline" size={25} color={Colors.blue} />
          )}
        </TouchableOpacity>
      )}
      {!user && (
        <View style={{ position: 'relative' }}>
          {flag && (
            <Image
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                bottom: -5,
                right: -5,
                resizeMode: 'contain',
              }}
              source={flag}
            />
          )}

          {name && <MyDataRow label="Name" value={name} />}

          {game && <MyDataRow label="Sport" value={game} />}

          {country && <MyDataRow label="Country" value={country} />}
          {createdAt && (
            <Text style={styles.createdAt}>Added On: {createdAt}</Text>
          )}
        </View>
      )}

      {user && (
        <View>
          <Text
            style={{ fontSize: 16, fontWeight: '400', color: Colors.purple }}
          >
            {name}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 5,
    flexDirection: 'column',
    gap: 10,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    elevation: 2,
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

  createdAt: {
    fontSize: 12,
    color: Colors.rose,
    textAlign: 'left',
    marginLeft: 10,
  },
});
