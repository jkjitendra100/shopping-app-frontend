import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { cardStyle } from '../../styles/global';
import logo from '../../assets/logo.png';
import MyTitle from '../global/MyTitle';
import { useSelector } from 'react-redux';
import MyDataRow from '../global/MyDataRow';
import { Colors } from '../../theme/Colors';

export default function ProfileData() {
  const { user, player, isAuthenticated } = useSelector((state) => state.user);

  return (
    <View style={{ marginTop: 10 }}>
      <View style={cardStyle}>
        <Image style={styles.logo} source={logo} alt="logo" />
        <View style={styles.dataView}>
          <MyTitle title="Personal Information" />

          <MyDataRow label="Name" value={user?.name} />
          <MyDataRow label="Email" value={user?.email} />
          <MyDataRow label="Mobile" value={user?.mobile} />
          <MyDataRow label="City" value={user?.city} />
          <MyDataRow label="State" value={user?.state} />
          <MyDataRow label="Country" value={user?.country} />
        </View>
      </View>
    </View>
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
