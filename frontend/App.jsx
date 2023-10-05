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
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  const stripeKey = 'cmkxocjddfjiodufdofhjf';
  return (
    <NavigationContainer>
      <Provider store={store}>
        {/* <StripeProvider
          publishableKey={publishableKey}
          merchantIdentifier="merchant.identifier" // required for Apple Pay
          urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        > */}
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <StatusBar backgroundColor={Colors.blue} />
          <TabNavigator />
        </KeyboardAvoidingView>
        {/* </StripeProvider> */}
      </Provider>
    </NavigationContainer>
    //{' '}
  );
}

const styles = StyleSheet.create({});
