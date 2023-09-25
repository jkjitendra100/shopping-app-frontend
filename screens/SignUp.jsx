import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Header from '../components/global/Header';
import { bodyStyle, containerStyle, screenWidth } from '../styles/global';
import { Colors } from '../theme/Colors';
import MyTextInput from '../components/global/MyTextInput';
import MyButton from '../components/global/MyButton';
import logo from '../assets/logo.png';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/action/userAction';
import axios from 'axios';
import { server } from '../server';
import Toast from 'react-native-toast-message';

export default function SignUp({ route }) {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpHandler = async () => {
    const myForm = new FormData();

    myForm.append('name', name);
    myForm.append('email', email);
    myForm.append('password', password);

    try {
      dispatch({
        type: 'registerRequest',
      });

      const { data } = await axios.post(`${server}/user/signup`, myForm, {
        headers: {
          Accept: 'multipart/form-data',
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      dispatch({
        type: 'registerSuccess',
        payload: data.message,
      });
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: data.message,
      });
    } catch (e) {
      if (!e.response) return alert('No internet connection');

      dispatch({
        type: 'registerFail',
        payload: e.response.data.message,
      });
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.response.data.message,
      });
    }
  };

  return (
    <>
      <Header title="SIGNUP" back />
      <ScrollView style={[containerStyle, { flex: 1 }]}>
        <View style={[bodyStyle, { overflow: 'hidden' }]}>
          <View style={styles.logoView}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.appName}>BATING APP</Text>
          </View>

          <View style={styles.inputView}>
            <MyTextInput
              placeholder="Enter full name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <MyTextInput
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email"
              style={styles.input}
            />

            <MyTextInput
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />

            <MyButton
              title="SIGN UP"
              onPress={signUpHandler}
              loading={loading}
              style={{ width: screenWidth - 80, marginTop: 50 }}
            />

            <View style={styles.signUpView}>
              <Text style={{}}>Already have an account</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('login')}
              >
                <Text style={{ color: Colors.blue, fontWeight: '500' }}>
                  LOG IN
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
    marginVertical: 30,
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

  inputView: {
    flexDirection: 'column',
    alignItems: 'center',
    height: '50%',
  },

  input: {
    fontSize: 20,
    textAlign: 'center',
    width: screenWidth - 80,
  },

  signUpView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 30,
  },
});
