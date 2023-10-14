import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import Feather from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

export default function Header({
  title = 'Title',
  back = false,
  home = true,
  cart,
}) {
  const navigation = useNavigation();
  const cartItems = useSelector((state) => state?.cart);

  return (
    <View style={styles.container}>
      {back && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={25} color={Colors.white} />
        </TouchableOpacity>
      )}

      <View style={{ marginRight: cart && 90 }}>
        <Text
          style={{
            fontSize: 20,
            color: Colors.white,
            textTransform: 'capitalize',
          }}
          numberOfLines={1}
        >
          {title}
        </Text>
      </View>

      {/* {cart && (
        <View style={{ position: 'absolute', right: 20 }}>
          <View style={{ position: 'relative' }}>
            <Feather size={30} name="shopping-cart" color={Colors.white} />
            <Text style={styles.cartText}>{cartItems?.cart?.length}</Text>
          </View>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.primary,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 20,
    gap: 20,
    zIndex: 10,
    position: 'relative',
  },

  logo: {
    width: 40,
    height: 40,
  },

  cartText: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.white,
    color: Colors.secondary,
    width: 20,
    height: 20,
    borderRadius: 100,
    fontSize: 12,
    textAlign: 'center',
  },
});
