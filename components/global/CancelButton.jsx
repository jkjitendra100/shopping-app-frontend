import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';

export default function CancelButton({
  title = 'CANCEL',
  onPress,
  width,
  icon,
  disabled,
}) {
  return (
    <View style={{ width: width }}>
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        style={styles.container}
        onPress={onPress}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {icon}
          <Text style={styles.btnText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.white,
    borderRadius: 0,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 1,
    borderWidth: 1,
    borderColor: Colors.gray,
  },

  btnText: {
    color: Colors.grayDark,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
