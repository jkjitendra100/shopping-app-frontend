import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { cardStyle } from '../../styles/global';
import logo from '../../assets/logo.png';
import MyTitle from '../global/MyTitle';
import { useSelector } from 'react-redux';
import MyDataRow from '../global/MyDataRow';
import { Colors } from '../../theme/Colors';
import { useNavigation } from '@react-navigation/native';

export default function ProfileData({ logoutHandler }) {
  const navigation = useNavigation();
  const { user, player, isAuthenticated } = useSelector((state) => state.user);

  return (
    <>
      <View style={[cardStyle, { flex: 1 }]}>
        <Image style={styles.logo} source={logo} alt="logo" />
        <Text
          style={{
            fontWeight: 'bold',
            textAlign: 'center',
            color: Colors.blue,
            fontSize: 20,
            marginTop: 10,
          }}
        >
          FANTASY APP
        </Text>
        <View style={styles.dataView}>
          <MyTitle
            title="PERSONAL INFORMATION"
            style={{ color: Colors.red, textDecorationLine: 'underline' }}
          />

          <View style={{ flexDirection: 'column', gap: 10 }}>
            <MyDataRow label="Name" value={user?.name} />
            <MyDataRow label="Email" value={user?.email} />
            <MyDataRow label="Mobile" value={user?.mobile} />
            <MyDataRow label="City" value={user?.city} />
            <MyDataRow label="State" value={user?.state} />
            <MyDataRow label="Country" value={user?.country} />
          </View>
        </View>
        <View style={[cardStyle, { marginTop: 10 }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold', color: Colors.blue }}>
              My Fantasies
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ backgroundColor: Colors.blue, borderRadius: 10 }}
              onPress={() =>
                navigation.navigate('My Fantasies', { screen: 'myFantasies' })
              }
            >
              <Text
                style={{ fontWeight: 'bold', color: Colors.white, padding: 10 }}
              >
                Click here
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[cardStyle, { marginTop: 10 }]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontWeight: 'bold', color: Colors.blue }}>
              Logout
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ backgroundColor: Colors.red, borderRadius: 10 }}
              onPress={logoutHandler}
            >
              <Text
                style={{ fontWeight: 'bold', color: Colors.white, padding: 10 }}
              >
                Click here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    alignSelf: 'center',
  },

  dataView: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    borderRadius: 10,
    padding: 10,
  },
});
