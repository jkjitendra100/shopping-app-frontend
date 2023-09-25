import axios from 'axios';
import { server } from '../store';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { useNavigation } from '@react-navigation/native';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: 'loginRequest',
    });

    const { data } = await axios.post(
      `${server}/user/login`,
      {
        email: 'user@gmail.com',
        password: '123456',
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
    // dispatch({
    //   type: 'loginFail',
    //   payload: e.response.data.message,
    // });
    // Toast.show({
    //   type: 'error',
    //   text1: 'Error',
    //   text2: e.response.data.message,
    // });

    console.log('Error', e);
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

    console.log('data', data);

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
    // dispatch({
    //   type: 'registerFail',
    //   payload: e.response.data.message,
    // });
    // Toast.show({
    //   type: 'error',
    //   text1: 'Error',
    //   text2: e.response.data.message,
    // });

    console.log('Error', e);
  }
};
