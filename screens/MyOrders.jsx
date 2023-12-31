import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import Header from '../components/global/Header';
import { bodyStyle } from '../styles/global';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { server } from '../server';
import Toast from 'react-native-toast-message';
import OrderCard from '../components/order/OrderCard';
import Loading from '../components/global/Loading';

export default function MyOrders({ navigation }) {
  const { isAuthenticated } = useSelector((state) => state?.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sync, setSync] = useState(0);

  useEffect(() => {
    if (!isAuthenticated)
      return Alert.alert('Alert !', 'Please login to get your data', [
        { text: 'Back', onPress: () => navigation.goBack() },
        {
          text: 'Login',
          onPress: () => navigation.navigate('Login', { screen: 'login' }),
        },
      ]);

    // Axios request
    setLoading(true);
    const fetchOrders = async () => {
      await axios
        .get(`${server}/order/my`)
        .then((res) => {
          setLoading(false);
          setRefreshing(false);
          setOrders(res?.data?.orders);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
          setRefreshing(false);
          Toast.show({ type: 'error', text1: e?.response?.data?.message });
        });
    };

    fetchOrders();
  }, [sync]);

  const onRefresh = useCallback(() => {
    setSync((state) => state + 1);
    setRefreshing(true);
  }, []);

  return (
    <>
      <Header back title="My Orders" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {orders?.map((item, index) => (
            <OrderCard
              key={index}
              name={item?.orderItems[0]?.name}
              price={`₹${Number(item?.orderItems[0]?.price)?.toLocaleString(
                'en-In'
              )}/-`}
              quantity={item?.orderItems[0]?.quantity}
              orderedAt={new Date(Date.parse(item?.createdAt))?.toLocaleString(
                'en-In'
              )}
              image={{ uri: item?.orderItems[0]?.image }}
              onPress={() =>
                navigation.navigate('orderDetails', { order: item })
              }
            />
          ))}
        </ScrollView>
        {loading && <Loading />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
