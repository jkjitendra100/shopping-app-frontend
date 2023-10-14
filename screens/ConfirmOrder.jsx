import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/global/Header';
import { bodyStyle } from '../styles/global';
import CancelButton from '../components/global/CancelButton';
import MyButton from '../components/global/MyButton';
import { Colors } from '../theme/Colors';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import { server } from '../server';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import loadingGif from '../assets/loadingBlue.gif';
import PlaceOrder from '../components/order/PlaceOrder';
import Loading from '../components/global/Loading';

export default function ConfirmOrder({ navigation, route }) {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { product, selectedPlayers } = route.params;
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const getProductQuantity = (qty) => {
    setQuantity(qty);
  };

  const handlePlaceOrder = async () => {
    if (!user?._id)
      return Alert.alert('Alert !', 'Please login to continue', [
        { text: 'Cancel' },
        {
          text: 'Login',
          onPress: () => navigation.navigate('Login', { screen: 'login' }),
        },
      ]);

    let orderItems = [];
    orderItems.push({
      name: product?.name,
      price: product?.price,
      quantity,
      image: product?.images[0]?.url,
      product: product?._id,
    });

    // Axios request
    setLoading(true);
    await axios
      .post(
        `${server}/order/new`,
        {
          orderItems,
          itemsPrice: orderItems[0]?.price * orderItems[0]?.quantity,
          taxPrice: 0,
          totalAmount: orderItems[0]?.price * orderItems[0]?.quantity,
          selectedPlayers,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      )
      ?.then((res) => {
        setLoading(false);
        Toast.show({ type: 'success', text1: res?.data?.message });
        navigation?.replace('home');
      })
      ?.catch((e) => {
        console.log(e);
        setLoading(false);
        console.log('Fail');
        Toast.show({ type: 'error', text1: e?.response?.data?.message });
      });
  };

  return (
    <>
      <Header back title="Confirm Order" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <PlaceOrder product={product} getProductQuantity={getProductQuantity} />
      </View>

      {/* Buttons */}
      {!loading ? (
        <View style={styles.buttonsView}>
          <CancelButton
            width={'50%'}
            title={'CANCEL'}
            icon={<Entypo name="cross" size={20} color={Colors.grayDark} />}
            onPress={() => navigation.goBack()}
          />
          <MyButton
            width={'50%'}
            title="PLACE ORDER"
            icon={<Feather name="arrow-right" size={20} color={Colors.white} />}
            onPress={handlePlaceOrder}
          />
        </View>
      ) : (
        <View style={styles.loadingView}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
            }}
          >
            Processing... Please wait
          </Text>
          <Image style={{ width: 40, height: 40 }} source={loadingGif} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  buttonsView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    backgroundColor: Colors.white,
  },

  loadingView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 8,
  },
});

