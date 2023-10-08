import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/global/Header';
import { cardStyle } from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import ProfileData from '../components/profile/ProfileData';
import MyFantasy from '../components/profile/MyFantasy';
import { useDispatch, useSelector } from 'react-redux';
import MyButton from '../components/global/MyButton';
import axios from 'axios';
import { server } from '../server';

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    Alert.alert('Alert ⚠️', 'Are you sure, you want to logout?', [
      { text: 'CANCEL' },
      { text: 'LOGOUT', onPress: () => logoutHandler() },
    ]);
  };
  const logoutHandler = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${server}/user/logout`,
    };

    setLoading(true);
    axios
      .request(config)
      .then((res) => {
        dispatch({ type: 'logoutSuccess' });
        setLoading(false);
      })
      .catch((e) => {
        dispatch({ type: 'logoutFail' });
        setLoading(false);
        console.log(e);
        if (!e?.response?.data) alert('No internet connection');
      });
  };

  if (!isAuthenticated) return navigation?.navigate('login');

  return (
    <>
      <Header title="My Profile" back />
      <View style={[cardStyle, { flex: 1 }]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {isAuthenticated ? (
            <ProfileData logoutHandler={handleLogout} />
          ) : (
            <View>
              <MyButton
                title="Login Now"
                onPress={() => navigation.navigate('login')}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
