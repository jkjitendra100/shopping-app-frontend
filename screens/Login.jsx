import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/global/Header';
import {
  bodyStyle,
  cardStyle,
  containerStyle,
  screenWidth,
} from '../styles/global';
import { Colors } from '../theme/Colors';
import MyTextInput from '../components/global/MyTextInput';
import MyButton from '../components/global/MyButton';
import logo from '../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/action/userAction';
import axios from 'axios';
import { server } from '../server';
import Toast from 'react-native-toast-message';

export default function Login() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    // Validation
    const isValidEmail = emailRegex.test(email);
    if (!isValidEmail) return alert('Please enter valid email');
    if (password?.length < 6)
      return alert('Password must be a minimum of 6 characters');

    // Axios request
    let data = JSON.stringify({
      email,
      password,
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${server}/user/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    setLoading(true);
    axios
      .request(config)
      .then((res) => {
        // setLoading(false);
        console.log(JSON.stringify(res.data));
        dispatch({ type: 'loginSuccess' });
        navigation.replace('profile');
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res.data.message,
        });
      })
      .catch((e) => {
        setLoading(false);
        dispatch({ type: 'loginFail' });
        if (!e.response.data) alert('Something went wrong! Please try again');
        console.log(e);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: e?.response?.data?.message,
        });
      });
  };

  if (isAuthenticated) return navigation.goBack();

  return (
    <>
      <Header title="Login" back />
      <ScrollView style={containerStyle} showsVerticalScrollIndicator={false}>
        <View style={[cardStyle, { marginVertical: 10 }]}>
          <View style={styles.logoView}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.appName}>FANTASY APP</Text>
          </View>

          <View>
            <MyTextInput
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <MyTextInput
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
            />

            <MyButton
              title="LOG IN"
              onPress={loginHandler}
              loading={loading}
              style={{ marginVertical: 50 }}
            />

            <View style={styles.signUpView}>
              <Text style={{}}>Don't have an account</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('signUp')}
              >
                <Text style={{ color: Colors.blue, fontWeight: '500' }}>
                  SIGN UP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  logoView: {
    marginVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },

  appName: {
    color: Colors.blueDark,
    fontWeight: 'bold',
    fontSize: 20,
  },

  signUpView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 30,
    marginBottom: 10,
  },
});
