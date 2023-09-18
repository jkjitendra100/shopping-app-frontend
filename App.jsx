import {StatusBar, StyleSheet, Text, KeyboardAvoidingView} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { Colors } from './theme/Colors';

export default function App() {
  return (
    <NavigationContainer>
      <KeyboardAvoidingView
      style={{ flex: 1 }}
    >
      <StatusBar backgroundColor={Colors.blue} />
        <TabNavigator />
        </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
