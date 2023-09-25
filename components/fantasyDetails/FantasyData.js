/* eslint-disable react-hooks/exhaustive-deps */
import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../server';
import { useDispatch } from 'react-redux';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { Colors } from '../../theme/Colors';
import { bodyStyle, containerStyle } from '../../styles/global';

export default function FantasyData({ id }) {
  const [fantasyDetails, setFantasyDetails] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(
          `${server}/fantasy/650b4acca25400ecc9725bd4`,
          {
            withCredentials: false,
          }
        );

        setFantasyDetails(data.data);
      } catch (e) {
        if (!e.response) return alert('Network error!');
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: e.response.data.message,
        });
      }
    };
    getData();
  }, [id]);

  console.log(fantasyDetails);
  return (
    <View style={containerStyle}>
      <View style={styles.card}>
        <View style={styles.dataRow}>
          <Text style={styles.key}>Name</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>Fantasy Name</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.key}>Name</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>Fantasy Name</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.key}>Name</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>Fantasy Name</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.key}>Name</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>Fantasy Name</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.key}>Name</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>Fantasy Name</Text>
        </View>

        <View style={styles.dataRow}>
          <Text style={styles.key}>Name</Text>
          <Text style={styles.colon}>:</Text>
          <Text style={styles.value}>Fantasy Name</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },

  card: {
    padding: 10,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.grayLight,
    borderRadius: 10,
  },

  title: {
    fontSize: 16,
    color: Colors.gray,
  },

  dataRow: {
    paddingHorizontal: 10,
    marginVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  key: {
    width: '25%',
    fontWeight: '500',
  },

  colon: {
    width: '5%',
    textAlign: 'center',
  },

  value: {
    width: '70%',
  },
});
