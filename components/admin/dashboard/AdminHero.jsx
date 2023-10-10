import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../theme/Colors';

export default function AdminHero() {
  return (
    <View>
      <View style={{ backgroundColor: Colors.blueLight, paddingVertical: 25 }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-around',
          }}
        >
          <View style={styles.box}>
            <Text style={styles.boxText}>PLAYERS</Text>
            <Text style={[styles.boxText, { fontSize: 25 }]}>135</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.boxText}>₹ REC.</Text>
            <Text style={[styles.boxText, { fontSize: 25 }]}>160k</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-around',
          }}
        >
          <View style={styles.box}>
            <Text style={styles.boxText}>MATCHES</Text>
            <Text style={[styles.boxText, { fontSize: 25 }]}>45</Text>
          </View>

          <View style={styles.box}>
            <Text style={styles.boxText}>USERS</Text>
            <Text style={[styles.boxText, { fontSize: 25 }]}>185</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: '40%',
    flexDirection: 'column',
    gap: 5,
    margin: 10,
    padding: 10,
    backgroundColor: Colors.blue,
    borderRadius: 10,
  },
  boxText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});
