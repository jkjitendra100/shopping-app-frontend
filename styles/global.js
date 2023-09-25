import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../theme/Colors';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const containerStyle = StyleSheet.create({
  marginHorizontal: 15,
  flex: 1,
});

export const bodyStyle = StyleSheet.create({
  padding: 10,
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.grayLight,
  borderRadius: 10,
  elevation: 1,
});

export const cardHeading = StyleSheet.create({
  fontSize: 18,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 10,
  color: Colors.blue,
});

export const titleStyle = StyleSheet.create({
  fontWeight: '500',
  color: Colors.grayDark,
  fontSize: 16,
  marginBottom: 15,
});
