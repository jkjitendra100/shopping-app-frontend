/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../../components/global/Header';
import { Colors } from '../../theme/Colors';
import Hero from '../../components/home/Hero';
import ProductCard from '../../components/products/ProductCard';
import axios from 'axios';
import { server } from '../../server';
import Toast from 'react-native-toast-message';
import MyButton from '../global/MyButton';
import { useNavigation } from '@react-navigation/native';
import Loading from '../global/Loading';
import { bodyStyle } from '../../styles/global';

export default function HomeProducts() {
  const navigation = useNavigation();
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
          setProducts(res.data.products);
        })
        ?.catch((e) => {
          console.log(e);
          setLoading(false);
          setRefreshing(false);
          if (!e?.response?.data) {
            alert('Network error !');
          }
          Toast.show({
            type: 'error',
            text1: e?.response?.data?.message,
          });
        });
    };
    fetchData();
  }, [sync]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setSync((state) => state + 1);
  }, []);

  return (
    <View style={{ height: '100%' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
      >
        <View style={styles.productsView}>
          {products?.map((item, index) => (
            <View
              key={index}
              style={{
                width: '48%',
                alignSelf: 'center',
                flexDirection: 'row',
              }}
            >
              <ProductCard
                name={item?.name}
                image={item?.images[0]}
                price={item?.price?.toLocaleString('en-In')}
                onPress={() =>
                  navigation.navigate('productDetails', { product: item })
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>
      {loading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  productsView: {
    flex: 1,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    flexWrap: 'wrap',
    margin: 0,
  },
});
