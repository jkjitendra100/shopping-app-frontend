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
import {
  bodyStyle,
  cardStyle,
  containerStyle,
  inputStyle,
  screenWidth,
} from '../styles/global';
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
import { Picker } from '@react-native-picker/picker';
import { Country, State, City } from 'country-state-city';

export default function SignUp({ route }) {
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  // const [country, setCountry] = useState('IN');
  // const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const signUpHandler = async () => {
    // Validation
    const isValidEmail = emailRegex.test(email);
    if (name?.length < 3) return alert('Name is too sort');
    if (!isValidEmail) return alert('Please enter valid email');
    if (password?.length < 6)
      return alert('Password must be a minimum of 6 characters');

    // Axios request
    let data = new FormData();
    data.append('name', name);
    data.append('email', email);
    data.append('password', password);
    // data.append('mobile', mobile);
    // data.append('state', state);
    // data.append('country', country);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${server}/user/signup`,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: data,
    };

    setLoading(true);
    axios
      .request(config)
      .then((res) => {
        setLoading(false);
        dispatch({ type: 'registerSuccess' });
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: res?.data?.message,
        });
      })
      .catch((e) => {
        setLoading(false);
        dispatch({ type: 'registerFail' });
        if (!e?.response?.data) alert('Something went wrong! Please try again');
        console.log(e);
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: e?.response?.data?.message,
        });
      });
  };

  if (isAuthenticated) return navigation.goBack();

  return (
    <>
      <Header title="SIGNUP" back />
      <ScrollView style={containerStyle} showsVerticalScrollIndicator={false}>
        <View style={[cardStyle, { marginVertical: 10 }]}>
          <View style={styles.logoView}>
            <Image style={styles.logo} source={logo} />
            <Text style={styles.appName}>FANTASY APP</Text>
          </View>

          <View>
            <MyTextInput
              placeholder="Enter full name"
              value={name}
              onChangeText={setName}
            />

            <MyTextInput
              placeholder="Enter email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            {/* <MyTextInput
              placeholder="Enter mobile no."
              value={mobile}
              onChangeText={setMobile}
              keyboardType="numeric"
              maxLength={10}
            /> */}

            <MyTextInput
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
            />

            {/* <View style={[inputStyle, { padding: 0 }]}>
              <Picker
                selectedValue={country}
                onValueChange={(itemValue, itemIndex) => setCountry(itemValue)}
                mode="dialog"
              >
                <Picker.Item
                  label="--- SELECT COUNTRY ---"
                  value={''}
                  style={{ fontSize: 14 }}
                />
                {Country.getAllCountries()?.map((item) => (
                  <Picker.Item
                    key={item?.isoCode}
                    label={item?.name}
                    value={item?.isoCode}
                    style={{ fontSize: 14 }}
                  />
                ))}
              </Picker> 
            </View>*/}

            {/* <View style={[inputStyle, { padding: 0 }]}>
              <Picker
                selectedValue={state}
                onValueChange={(itemValue, itemIndex) => setState(itemValue)}
                mode="dialog"
              >
                <Picker.Item
                  label="--- SELECT STATE ---"
                  value={''}
                  style={{ fontSize: 14 }}
                />
                {State.getAllStates()
                  ?.filter((e) => e?.countryCode === country)
                  ?.map((item) => (
                    <Picker.Item
                      key={item?.isoCode}
                      label={item?.name}
                      value={item?.isoCode}
                      style={{ fontSize: 14 }}
                    />
                  ))}
              </Picker>
            </View> */}

            <MyButton
              title="SIGN UP"
              onPress={signUpHandler}
              loading={loading}
              style={{ marginVertical: 50 }}
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

  signUpView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginTop: 30,
    marginBottom: 10,
  },
});
