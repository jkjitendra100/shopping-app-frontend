import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/Colors'

export default function MyButton({title="Button", onPress}) {
  return (
    <View>
      <TouchableOpacity activeOpacity={0.7} style={styles.container} onPress={onPress}>
              <Text style={{color: Colors.white, fontWeight: 'bold', textTransform: "uppercase" }}>{title}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 15, backgroundColor: Colors.blue, borderRadius: 100, paddingHorizontal: 50,
        minWidth: 180,
        flexDirection: 'row', justifyContent: "center",
        elevation: 5, borderWidth:1, borderColor: Colors.blueDark
    }
})