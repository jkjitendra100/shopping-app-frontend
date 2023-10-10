import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../theme/Colors';

export const screenHeight = Dimensions.get('window').height;
export const screenWidth = Dimensions.get('window').width;

export const containerStyle = StyleSheet.create({
  paddingHorizontal: 10,
  backgroundColor: Colors.white,
});

export const bodyStyle = StyleSheet.create({
  paddingHorizontal: 10,
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.grayLight,
  borderRadius: 10,
  elevation: 1,
});

export const cardStyle = StyleSheet.create({
  padding: 10,
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.grayLight,
  borderRadius: 10,
});
