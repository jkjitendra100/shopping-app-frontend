import axios from 'axios';
import { server } from '../store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'loginRequest',
    });

    console.log('Reached');

    const { data } = await axios.post(
      `${server}/user/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Data', data);

    dispatch({
      type: 'loginSuccess',
      payload: data.message,
    });
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: data.message,
    });
  } catch (e) {
    console.log('Error', e);
    if (!e.response) return alert('No internet connection');
    dispatch({
      type: 'loginFail',
      payload: e.response.data.message,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: e.response.data.message,
    });
  }
};

export const userProfile = () => async (dispatch) => {
  try {
    dispatch({
      type: 'isUserRequest',
    });

    const { data } = await axios.get(`${server}/user/me`, {
      withCredentials: true,
    });

    dispatch({
      type: 'isUserSuccess',
      payload: data.user,
    });
  } catch (e) {
    if (!e.response) return alert('No internet connection');
    dispatch({
      type: 'isUserFail',
      payload: e.response.data.message,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: e.response.data.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: 'logoutRequest',
    });

    const { data } = await axios.get(`${server}/user/logout`, {
      withCredentials: true,
    });

    dispatch({
      type: 'logoutSuccess',
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
      type: 'logoutFail',
      payload: e.response.data.message,
    });
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: e.response.data.message,
    });
  }
};

export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: 'registerRequest',
    });

    const { data } = await axios.post(`${server}/user/signup`, formData, {
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
