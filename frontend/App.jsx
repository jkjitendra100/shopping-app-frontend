import {
  StatusBar,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './TabNavigator';
import { Colors } from './theme/Colors';
import { Provider } from 'react-redux';
import { store } from './redux/store';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <StatusBar backgroundColor={Colors.blue} />
          <TabNavigator />
        </KeyboardAvoidingView>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
