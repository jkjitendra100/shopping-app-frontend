import { StyleSheet } from 'react-native'
import { Colors } from '../theme/Colors';


  export const containerStyle = StyleSheet.create({
    margin: 10,
});

export const bodyStyle  = StyleSheet.create({
    padding: 10, backgroundColor: Colors.white, height: "96%", width: "100%",
          borderWidth: 1, borderColor: Colors.grayLight, borderRadius: 10, elevation: 1
});

export const cardHeading = StyleSheet.create({
    fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10,
                color: Colors.blue
});