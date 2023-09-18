import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/Colors'

export default function PlayerCard({playerName = "Player Name"}) {
  return (
      <View style={styles.container}>
          <View style={{flexDirection: "row", gap: 10}}>
              <Text style={{width: "25%"}}>Name</Text>
              <Text style={{width: "5%"}}>:</Text>
              <Text style={{width: "70%"}}>{playerName}</Text>
          </View>

          <View style={{flexDirection: "row", gap: 10}}>
              <Text style={{width: "25%"}}>Name</Text>
              <Text style={{width: "5%"}}>:</Text>
              <Text style={{width: "70%"}}>{playerName}</Text>
          </View>

          <View style={{flexDirection: "row", gap: 10}}>
              <Text style={{width: "25%"}}>Name</Text>
              <Text style={{width: "5%"}}>:</Text>
              <Text style={{width: "70%"}}>{playerName}</Text>
          </View>

          <View style={{flexDirection: "row", gap: 10}}>
              <Text style={{width: "25%"}}>Name</Text>
              <Text style={{width: "5%"}}>:</Text>
              <Text style={{width: "70%"}}>{playerName}</Text>
          </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 20, backgroundColor: Colors.white, borderRadius: 10, marginVertical: 10, flexDirection: "column",
        gap: 10, borderWidth: 1, borderColor: Colors.grayLight, elevation: 3
    }
})