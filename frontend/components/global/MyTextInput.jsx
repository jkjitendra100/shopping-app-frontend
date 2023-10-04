import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';
import { inputStyle } from '../../styles/global';

export default function MyTextInput({
  placeholder = 'Placeholder',
  value,
  onChangeText,
  style,
  keyboardType,
  maxLength,
}) {
  return (
    <View>
      <TextInput
        style={[inputStyle, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
