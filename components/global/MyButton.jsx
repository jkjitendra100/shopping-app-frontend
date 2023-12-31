import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../../theme/Colors';
import loadingWhite from '../../assets/loadingWhite.gif';

export default function MyButton({
  title = 'Button',
  onPress,
  loading = false,
  loadingTitle = 'Processing please wait...',
  style,
  width,
  icon,
}) {
  return (
    <View style={{ width: width }}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.container, style]}
        onPress={onPress}
        disabled={loading}
      >
        {!loading ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={styles.text}>{title}</Text>
            {icon}
          </View>
        ) : (
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={styles.loadingText}>{loadingTitle}</Text>
            <Image style={styles.loading} source={loadingWhite} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: Colors.blue,
    borderRadius: 0,
    paddingHorizontal: 20,
    minWidth: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.blueDark,
  },

  text: {
    color: Colors.white,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },

  loading: {
    width: 20,
    height: 20,
  },

  loadingText: {
    color: Colors.white,
    fontSize: 14,
  },
});
