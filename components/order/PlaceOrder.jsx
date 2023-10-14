import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors } from '../../theme/Colors';
import Octicons from 'react-native-vector-icons/Octicons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { server } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

export default function PlaceOrder({
  product,
  getProductQuantity,
}) {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductQuantity(quantity);
  }, [quantity]);

  const handleIncreaseQuantity = async () => {
    if (!user?._id)
      return Alert.alert('Alert !', 'Please login to continue', [
        { text: 'Cancel' },
        {
          text: 'Login',
          onPress: () => navigation.navigate('Login', { screen: 'login' }),
        },
      ]);

    // Axios request
    await axios
      .patch(
        `${server}/user/cart/increaseQuantity/${user?._id}`,
        { productId: product?._id },
        { headers: { 'Content-Type': 'application/json' } }
      )
      ?.then((res) => {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: res.data?.message,
        });
        dispatch({
          type: 'increaseCartItemQuantity',
          payload: res?.data?.data?.cart,
        });
      })
      ?.catch((e) => {
        setLoading(false);
        console.log(e);
        if (!e?.response?.data) return alert('Network error');
        Toast.show({
          type: 'success',
          text1: e?.response?.data?.message,
        });
      });
  };

  const handleDecreaseQuantity = async () => {
    if (!user?._id)
      return Alert.alert('Alert !', 'Please login to continue', [
        { text: 'Cancel' },
        {
          text: 'Login',
          onPress: () => navigation.navigate('Login', { screen: 'login' }),
        },
      ]);

    // Axios request
    await axios
      .patch(
        `${server}/user/cart/decreaseQuantity/${user?._id}`,
        { productId: product?._id },
        { headers: { 'Content-Type': 'application/json' } }
      )
      ?.then((res) => {
        setLoading(false);
        Toast.show({
          type: 'success',
          text1: res.data?.message,
        });

        dispatch({
          type: 'decreaseCartItemQuantity',
          payload: res?.data?.data?.cart,
        });
      })
      ?.catch((e) => {
        setLoading(false);
        console.log(e);
        if (!e?.response?.data) return alert('Network error');
        Toast.show({
          type: 'error',
          text1: e?.response?.data?.message,
        });
      });
  };

  return (
    <View>
      <View style={{ borderBottomWidth: 0.5, borderColor: Colors.grayLight }}>
        <Image
          style={{ width: '100%', height: 250, resizeMode: 'contain' }}
          source={{ uri: product?.images[0]?.url }}
        />
      </View>

      {/* Quantity View */}
      <View style={styles.quantityView}>
        <Text style={{ fontWeight: 'bold', color: Colors.primary }}>
          Quantity
        </Text>
        <View style={{ flexDirection: 'row', gap: 30, alignItems: 'center' }}>
          <TouchableOpacity
            // onPress={handleDecreaseQuantity}
            onPress={() => setQuantity((state) => state - 1)}
            disabled={quantity === 1}
            // disabled={
            //   cart?.find((e) => e?.productId === product?._id)?.quantity ===
            //     1 && true
            // }
          >
            <Octicons name="dash" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.quantity}>
            {/* {cart?.find((e) => e?.productId === product?._id)?.quantity
              ? cart?.find((e) => e?.productId === product?._id)?.quantity
              : 0} */}
            {quantity}
          </Text>
          {/* <TouchableOpacity onPress={handleIncreaseQuantity}> */}
          <TouchableOpacity onPress={() => setQuantity((state) => state + 1)}>
            <Feather name="plus" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Price */}
      <View style={styles.priceView}>
        <Text style={{ fontWeight: 'bold', color: Colors.primary }}>Price</Text>
        <Text style={[styles.quantity]}>
          ₹{Number(product?.price)?.toLocaleString('en-In')}/-
        </Text>
      </View>

      {/* Delivery charge */}
      <View style={styles.priceView}>
        <Text style={{ fontWeight: 'bold', color: Colors.primary }}>
          Delivery Charge
        </Text>
        <Text style={[styles.quantity]}>Free</Text>
      </View>

      {/* Sub total */}
      <View style={styles.priceView}>
        <Text style={{ fontWeight: 'bold', color: Colors.primary }}>
          Sub Total (Inclusive of all taxes)
        </Text>
        <Text style={[styles.quantity]}>
          ₹
          {Number(
            // cart?.find((e) => e?.productId === product?._id)?.quantity *
            quantity * product?.price
          )?.toLocaleString('en-In')}
          /-
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quantityView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.grayLight,
    padding: 10,
  },

  quantity: {
    fontSize: 16,
    fontWeight: '400',
    width: 'auto',
    textAlign: 'center',
    color: Colors.secondary,
  },

  priceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Colors.grayLight,
    padding: 10,
  },
});
