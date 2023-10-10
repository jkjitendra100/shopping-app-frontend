/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Header from '../components/global/Header';
import MyButton from '../components/global/MyButton';
import { Colors } from '../theme/Colors';
import Hero from '../components/home/Hero';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  return (
    <>
      <Header home title="Fantasy App" />
      <Hero />
      <View style={{ flex: 1, backgroundColor: Colors.white }}></View>
    </>
  );
}

const styles = StyleSheet.create({});
