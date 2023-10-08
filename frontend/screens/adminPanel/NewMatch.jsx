import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import NewMatchForm from '../../components/admin/newMatch/NewMatchForm';
import { containerStyle } from '../../styles/global';
import Header from '../../components/global/Header';

export default function NewMatch() {
  const [selectedPlayerModal, setSelectedPlayerModal] = useState(false);
  return (
    <>
      <Header back title="Add New Match" />
      <View style={[containerStyle, { flex: 1 }]}>
        <NewMatchForm
          selectedPlayerModal={selectedPlayerModal}
          setSelectedPlayerModal={setSelectedPlayerModal}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
