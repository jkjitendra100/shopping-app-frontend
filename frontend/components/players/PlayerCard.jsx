import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyDataRow from '../global/MyDataRow';

export default function PlayerCard({
  name = 'Player Name',
  game,
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
          <View
            style={{
              flexDirection: 'row',
              gap: 15,
              position: 'absolute',
              right: -5,
              bottom: -5,
            }}
          >
            {flag && (
              <Image
                style={{
                  width: 35,
                  height: 35,
                  resizeMode: 'contain',
                }}
                source={flag}
              />
            )}
            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 100,
                backgroundColor: '#dbeafe',
              }}
            >
              <MaterialIcons name="mode-edit" size={25} color={Colors.blue} />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                padding: 5,
                borderRadius: 100,
                backgroundColor: '#fee2e2',
              }}
            >
              <MaterialCommunityIcons
                name="delete"
                size={25}
                color={Colors.red}
              />
            </TouchableOpacity>
          </View>

          {name && <MyDataRow label="Name" value={name} />}

          {game && <MyDataRow label="Sport" value={game} />}

          {country && <MyDataRow label="Country" value={country} />}
          <View
            style={{
              borderWidth: 0.5,
              borderColor: Colors.grayLight,
              marginTop: 5,
              marginBottom: 5,
            }}
          />
          {createdAt && (
            <View>
              <Text style={{ fontSize: 10, marginLeft: 10 }}>Added On</Text>
              <Text style={styles.createdAt}>{createdAt}</Text>
            </View>
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
    fontSize: 14,
    color: Colors.rose,
    textAlign: 'left',
    marginLeft: 10,
  },
});
