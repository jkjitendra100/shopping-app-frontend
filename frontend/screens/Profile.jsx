import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/global/Header';
import { containerStyle } from '../styles/global';
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
      <ScrollView style={containerStyle}>
        {isAuthenticated ? (
          <ProfileData />
        ) : (
          <View>
            <MyButton
              title="Login Now"
              onPress={() => navigation.navigate('login')}
            />
          </View>
        )}
        <MyFantasy />
        {/* ///////////////////////////// */}

        <TouchableOpacity
          style={{ marginVertical: 10 }}
          onPress={logoutHandler}
        >
          <Text>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
