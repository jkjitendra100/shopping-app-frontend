import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Colors } from '../../theme/Colors'

export default function MyTextInput({ placeholder = "Placeholder", value,
  onChangeText, style, keyboardType, maxLength }) {
  return (
    <View>
      <TextInput
        style={[styles.textInput, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10, backgroundColor: Colors.white, borderWidth: 1,
    borderColor: Colors.blue, borderRadius: 100,
    margin: 10,
    paddingHorizontal: 25,
    width: "94%"
  }
})