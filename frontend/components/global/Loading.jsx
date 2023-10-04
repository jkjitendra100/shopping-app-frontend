import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';
import loadingBlue from '../../assets/loadingBlue.gif';

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image style={{ width: 100, height: 100 }} source={loadingBlue} />
      <Text style={{ textAlign: 'center', color: Colors.blue }}>Loading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
