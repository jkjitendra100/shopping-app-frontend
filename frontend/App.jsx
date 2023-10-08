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
  const publishableKey_Live =
    'pk_live_51NuYBCSHUsnA0lNLG5ENiBqJAuatOvhv8sSLgDpE5t7T9R1QZt6RejWbb5lfDNCEKZLfeEEtc5ObvTUJOjIw0ksu004C8YCchD';

  const publishableKey =
    'pk_test_51NuYBCSHUsnA0lNLjIVRcntqQG6uF1iDeAoKnMiHpI6XGDJsEYAbwh7MdiBfZkJFZChP8WIVKGgopoONsi50OdD400ZWDE8BMC';
  return (
    <NavigationContainer>
      <Provider store={store}>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <StatusBar backgroundColor={Colors.blue} />
          <StripeProvider
            publishableKey={publishableKey}
            merchantIdentifier="merchant.identifier" // required for Apple Pay
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          >
            <TabNavigator />
          </StripeProvider>
        </KeyboardAvoidingView>
      </Provider>
    </NavigationContainer>
    //{' '}
  );
}

const styles = StyleSheet.create({});
