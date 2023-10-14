/* eslint-disable react-hooks/exhaustive-deps */
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/global/Header';
import MyButton from '../components/global/MyButton';
import { Colors } from '../theme/Colors';
import Hero from '../components/home/Hero';
import { useSelector } from 'react-redux';
import ProductCard from '../components/products/ProductCard';
import axios from 'axios';
import { server } from '../server';
import Toast from 'react-native-toast-message';
import { bodyStyle } from '../styles/global';
import HomeProducts from '../components/home/HomeProducts';

export default function HomeScreen() {
  return (
    <>
      <Header home title="Khelo Jeeto" />
      <Hero />
      <View style={[bodyStyle, { flex: 1 }]}>
        <HomeProducts />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
