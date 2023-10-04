import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import Header from '../components/global/Header';
import { cardStyle, containerStyle } from '../styles/global';
import MyDataRow from '../components/global/MyDataRow';
import MyTitle from '../components/global/MyTitle';

export default function MatchDetails({ navigation, route }) {
    const { id } = route?.params;
    
  useEffect(() => {}, []);
  return (
    <>
      <Header back title="Match Details" />
      <ScrollView style={containerStyle}>
        <View style={[cardStyle, { marginTop: 10 }]}>
          <MyTitle title="About Match" />
          <MyDataRow label="Match Name" value="test" />
        </View>
        <Text>dj</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
