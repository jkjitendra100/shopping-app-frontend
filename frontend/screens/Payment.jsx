import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/global/Header';
import axios from 'axios';
import { server } from '../server';
import MyButton from '../components/global/MyButton';
import { useStripe } from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';
import UserFantasy from '../components/payment/UserFantasy';
import { bodyStyle } from '../styles/global';
import { Colors } from '../theme/Colors';
import { useSelector } from 'react-redux';

export default function Payment({ navigation, route }) {
  const { user } = useSelector((state) => state.user);
  const { matchDetails, fantasy } = route?.params?.params;
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);

  const paymentHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/fantasy/payment`,
        {
          amount: matchDetails?.data?.entryFee,
          userId: user?._id,
          fantasyId: fantasy?._id,
          matchId: fantasy?.matchId,
          // client_secret sending in DB from backend
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const init = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data?.client_secret,
        merchantDisplayName: 'Fantasy App',
      });

      if (init.error) {
        setLoading(false);

        return Toast.show({
          type: 'error',
          text1: 'Error',
          text2: init.error.message,
        });
      }

      const paymentSheet = await stripe.presentPaymentSheet();

      if (paymentSheet.error) {
        setLoading(false);
        return Toast.show({
          type: 'error',
          text1: 'Error',
          text2: paymentSheet.error.message,
        });
      }

      const { paymentIntent } = await stripe.retrievePaymentIntent(
        data?.client_secret
      );

      if (paymentIntent.status === 'Succeeded') {
        // console.log('paymentIntent', paymentIntent);
        storePaymentData(paymentIntent.id, paymentIntent.status);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('Payment error: ', e?.message);
      if (!e?.response?.data) return Alert.alert('No network available');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e?.response?.data?.message,
      });
    }
  };

  const storePaymentData = async (paymentId, paymentStatus) => {
    try {
      setLoading(true);
      const { data } = await axios.patch(
        `${server}/fantasy/${fantasy?._id}`,
        {
          paymentId,
          paymentStatus,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      setLoading(false);
      Alert.alert('Successful', 'You have created your fantasy successfully', [
        { text: 'OK', onPress: () => navigation.navigate('home') },
      ]);
    } catch (e) {
      setLoading(false);
      if (!e?.response?.data) return Alert.alert('No network available');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e?.response?.data?.message,
      });
    }
  };

  return (
    <>
      <Header back title="Make Payment" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <UserFantasy matchDetails={matchDetails} fantasy={fantasy} />
      </View>

      <View style={{ padding: 20, backgroundColor: Colors.white }}>
        <MyButton
          title="MAKE PAYMENT"
          onPress={paymentHandler}
          loading={loading}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
