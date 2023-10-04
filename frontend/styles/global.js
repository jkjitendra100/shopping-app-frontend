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

export const cardStyle = StyleSheet.create({
  padding: 10,
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.grayLight,
  borderRadius: 10,
});

// export const titleStyle = StyleSheet.create({
//   fontWeight: '500',
//   color: Colors.grayDark,
//   fontSize: 16,
//   marginBottom: 15,
// });

export const inputStyle = StyleSheet.create({
  padding: 10,
  backgroundColor: Colors.white,
  borderWidth: 1,
  borderColor: Colors.blue,
  borderRadius: 100,
  margin: 10,
  paddingHorizontal: 25,
  width: '94%',
});

export const dataRowStyle = StyleSheet.create({
  dataRow: {
    paddingHorizontal: 10,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  key: {
    width: '25%',
    fontWeight: '500',
  },

  colon: {
    width: '5%',
    textAlign: 'center',
  },

  value: {
    width: '70%',
  },
});
