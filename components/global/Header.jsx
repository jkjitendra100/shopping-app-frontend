import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';

export default function Header({ title = 'Title', back = false, home = true }) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {back && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back-outline" size={25} color={Colors.blue} />
        </TouchableOpacity>
      )}

      <Text style={{ fontSize: 20, color: Colors.blue }} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.white,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 20,
    gap: 20,
    zIndex: 10,
  },

  logo: {
    width: 40,
    height: 40,
  },
});
