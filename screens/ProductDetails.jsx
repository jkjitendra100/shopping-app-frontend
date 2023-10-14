import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/global/Header';
import { bodyStyle } from '../styles/global';
import ProductData from '../components/products/ProductData';
import CancelButton from '../components/global/CancelButton';
import MyButton from '../components/global/MyButton';
import { Colors } from '../theme/Colors';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import { server } from '../server';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import loadingGif from '../assets/loadingBlue.gif';

export default function ProductDetails({ navigation, route }) {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const product = route.params?.product;
  const [loading, setLoading] = useState(false);
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const getSelectedPlayers = (players) => {
    setSelectedPlayers(players);
  };

  const handleAddToCart = async () => {
    if (!user)
      return Alert.alert('Alert !', 'Please login to continue', [
        { text: 'Cancel' },
        {
          text: 'Login',
          onPress: () => {
            navigation.navigate('Login', { screen: 'login' });
          },
        },
      ]);

    setLoading(true);
    await axios
      .patch(
        `${server}/user/cart/${user?._id}`,
        { productId: product?._id, quantity: 1 },
        { headers: { 'Content-Type': 'application/json' } }
      )
      ?.then((res) => {
        Toast.show({
          type: 'success',
          text1: res?.data?.message,
        });

        dispatch({
          type: 'addToCart',
          payload: res?.data?.data?.cart,
        });
        setLoading(false);
      })
      ?.catch((e) => {
        console.log(e);
        setLoading(false);
        if (!e?.response?.data) return alert('Network error !');
        Toast.show({ type: 'error', text1: e?.response?.data?.message });
      });
  };

  const handleBuyNow = () => {
    if (!user)
      return Alert.alert('Alert !', 'Please login to continue', [
        { text: 'Cancel' },
        {
          text: 'Login',
          onPress: () => {
            navigation.navigate('Login', { screen: 'login' });
          },
        },
      ]);
    navigation.navigate('confirmOrder', { product, selectedPlayers });
  };

  return (
    <>
      <Header back title={product?.name} cart />
      <View style={[bodyStyle, { flex: 1 }]}>
        <ProductData
          productDetails={product}
          getSelectedPlayers={getSelectedPlayers}
        />
      </View>
      {!loading ? (
        <View style={styles.buttonsView}>
          {/* <CancelButton
            width={'50%'}
            disabled={
              cart?.find((e) => e?.productId === product?._id) ? true : false
            }
            title={
              cart?.find((e) => e?.productId === product?._id)
                ? 'ADDED TO CART'
                : 'ADD TO CART'
            }
            icon={
              <AntDesign
                name="shoppingcart"
                size={20}
                color={Colors.grayDark}
              />
            }
            onPress={handleAddToCart}
          /> */}

          <MyButton
            width={'100%'}
            title="BUY NOW"
            icon={<Feather name="arrow-right" size={20} color={Colors.white} />}
            onPress={handleBuyNow}
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
