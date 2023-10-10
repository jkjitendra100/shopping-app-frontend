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
  numberOfLines = 1,
  title,
}) {
  return (
    <View style={{ margin: 10 }}>
      <Text style={{ marginLeft: 5, marginBottom: 2, color: Colors.primary }}>
        {title}
      </Text>
      <TextInput
        style={[styles.container, style]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 5,
    width: '100%',
  },
});
