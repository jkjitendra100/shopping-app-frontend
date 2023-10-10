import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../theme/Colors';
import { bodyStyle } from '../../../styles/global';

export default function DashboardCard({
  cardTitle = 'Card title',
  buttonTitle = 'TITLE',
  onPress,
}) {
  return (
    <View style={[bodyStyle, styles.container]}>
      <View
        style={{
          flexDirection: 'row',
          gap: 20,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 16, color: Colors.slate }}>{cardTitle}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={onPress}
        >
          <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginVertical: 10,
  },

  button: {
    padding: 10,
    backgroundColor: Colors.blue,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
    color: Colors.white,
    fontSize: 14,
  },
});
