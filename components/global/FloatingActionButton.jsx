import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';
import { screenHeight } from '../../styles/global';
import Entypo from 'react-native-vector-icons/Entypo';

export default function FloatingActionButton({
  icon = <Entypo name="plus" size={35} color={Colors.blue} />,
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 15,
    bottom: 20,
    backgroundColor: Colors.white,
    zIndex: 10,
  },
});
