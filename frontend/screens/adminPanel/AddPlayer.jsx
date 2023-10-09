import { StyleSheet, Text, View, Alert, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/global/Header';
import { bodyStyle } from '../../styles/global';
import { Colors } from '../../theme/Colors';
import AddNewPlayer from '../../components/admin/addPlayer/AddNewPlayer';

export default function AddPlayers({ navigation }) {
  return (
    <>
      <Header title="Add Player" back />
      <View style={[bodyStyle, { flex: 1 }]}>
        <AddNewPlayer navigation={navigation} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
