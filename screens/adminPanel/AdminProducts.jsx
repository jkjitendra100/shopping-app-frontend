import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { bodyStyle } from '../../styles/global';
import Header from '../../components/global/Header';
import axios from 'axios';
import { server } from '../../server';
import Loading from '../../components/global/Loading';
import Toast from 'react-native-toast-message';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sync, setSync] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await axios
        .get(`${server}/product/all`)
        ?.then((res) => {
          setLoading(false);
          setRefreshing(false);
          console.log(res?.data);
          setProducts(res?.data?.products);
        })
        ?.catch((e) => {
          console.log(e);
          setLoading(false);
          setRefreshing(false);
          if (!e?.response?.data) return alert('Network error');
          Toast.show({
            type: error,
            text1: e?.response?.data?.message,
          });
        });
    };

    fetchData();
  }, [sync]);

  const onRefresh = useCallback(() => {
    setSync((state) => state + 1);
    setRefreshing(true);
  }, []);
  return (
    <>
      <Header back title="Products List" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
        >
          <Text>Admin Products</Text>
        </ScrollView>
        {loading && <Loading />}
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
