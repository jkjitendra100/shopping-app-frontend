import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Header from '../components/global/Header';
import axios from 'axios';
import { server } from '../server';
import MyButton from '../components/global/MyButton';
import { useStripe } from '@stripe/stripe-react-native';
import Toast from 'react-native-toast-message';

export default function Payment({ navigation, route }) {
  const matchDetails = route?.params;
  const stripe = useStripe();
  const [loading, setLoading] = useState(false);

  const paymentHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${server}/fantasy/payment`,
        {
          amount: 1,
        },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      const init = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data?.client_secret,
        merchantDisplayName: 'My Fantasy Name',
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
        storePaymentData(paymentIntent.id, paymentIntent.status);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log('Payment error: ', e);
      if (!e?.response.error) return Alert.alert('No network available');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e?.response?.error?.message,
      });
    }
  };

  const storePaymentData = (id, status) => {
    console.log('ID: ', id, 'PaymentStatus: ', status);
  };

  return (
    <>
      <Header back title="Make Payment" />
      <View>
        <Text>Payment</Text>
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
