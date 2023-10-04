import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import MyTitle from '../global/MyTitle';
import { Colors } from '../../theme/Colors';
import { dataRowStyle } from '../../styles/global';
import MyDataRow from '../global/MyDataRow';
import FantasyCard from '../home/FantasyCard';

export default function MyFantasy() {
  return (
    <View>
      <View style={styles.container}>
        <MyTitle title="My Fantasies" />
        <FantasyCard />
        <FantasyCard />
        <FantasyCard />
        <FantasyCard />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
  },
});
