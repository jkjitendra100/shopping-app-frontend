import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';
import MyButton from '../global/MyButton';
import { useNavigation } from '@react-navigation/native';

export default function NoFantasy() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>YOU haven't made any fantasy</Text>
      <MyButton
        title="CREATE NOW"
        style={{ marginTop: 50 }}
        onPress={() => navigation.navigate('Home', { screen: 'home' })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    color: Colors.gray,
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 50,
  },
});
