import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../../theme/Colors'

export default function DashboardCard({cardTitle = "Card title", buttonTitle = "TITLE", onPress}) {
  return (
    <View style={styles.container}>
        <View style={{flexDirection: "row", gap: 20, alignItems: "center", justifyContent: "space-between"}}>
              <Text style={{fontSize: 16, color: Colors.slate}}>{cardTitle}</Text>
              <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={onPress}>
                  <Text style={styles.buttonText}>{buttonTitle}</Text>
              </TouchableOpacity>
          </View>
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20, borderWidth: 1, borderColor: Colors.grayLight, elevation: 2, marginVertical: 10,
        borderRadius: 10, backgroundColor: Colors.white
    },

    button: {
        padding: 10, backgroundColor: Colors.blue, width: 100, borderRadius: 10, flexDirection: "row",
        justifyContent: "center"
    },

    buttonText: {
        fontWeight: "bold", textTransform: "uppercase", color: Colors.white, fontSize: 16
    }
})