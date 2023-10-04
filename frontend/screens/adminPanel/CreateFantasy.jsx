import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Header from '../../components/global/Header';
import { containerStyle } from '../../styles/global';
import { Colors } from '../../theme/Colors';
import NewFantasyForm from '../../components/admin/createFantasy/NewFantasyForm';

export default function CreateFantasy() {
  const [selectedPlayerModal, setSelectedPlayerModal] = useState(true);
  return (
    <>
      <Header back title="Create New Fantasy" />
      <ScrollView style={containerStyle}>
        <NewFantasyForm
          selectedPlayerModal={selectedPlayerModal}
          setSelectedPlayerModal={setSelectedPlayerModal}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  selectPlayerBtn: {
    position: 'absolute',
    right: 10,
    bottom: 20,
    padding: 10,
    backgroundColor: Colors.blue,
    borderRadius: 100,
    paddingHorizontal: 20,
  },
});
