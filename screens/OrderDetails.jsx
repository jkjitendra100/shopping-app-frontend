import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../components/global/Header';
import { bodyStyle } from '../styles/global';
import MyDataRow from '../components/global/MyDataRow';
import { Colors } from '../theme/Colors';
import MyTitle from '../components/global/MyTitle';

export default function OrderDetails({ navigation, route }) {
  const { order } = route.params;

  console.log(order);
  return (
    <>
      <Header back title="Order Details" />
      <View style={[bodyStyle, { flex: 1 }]}>
        <View style={{ marginTop: 20 }}>
          <MyDataRow label="Item Name" value={order?.orderItems[0]?.name} />
          <View style={styles.border} />

          <MyDataRow
            label="Item Price"
            value={`₹${order?.orderItems[0]?.price}/-`}
          />
          <View style={styles.border} />

          <MyDataRow
            label="Quantity"
            value={`${order?.orderItems[0]?.quantity} Unit`}
          />
          <View style={styles.border} />

          <MyDataRow label="Total Amount" value={`₹${order?.totalAmount}/-`} />
          <View style={styles.border} />

          {/* <MyDataRow
            label="Payment Status"
            value={order?.orderItems[0]?.name}
          />
          <View style={styles.border} /> */}

          <MyDataRow
            label="Ordered At"
            value={new Date(Date.parse(order?.createdAt)).toLocaleString()}
          />
          <View style={styles.border} />
        </View>

        <MyTitle title="SELECTED PLAYERS" style={{ marginTop: 20 }} />
        {order?.selectedPlayers?.map((item, index) => (
          <View key={index}>
            <Text
              style={{ textTransform: 'capitalize', fontWeight: 'bold', padding: 10 }}
            >{`${index + 1}. ${item}`}</Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  border: {
    height: 1,
    backgroundColor: Colors.grayLight,
    marginVertical: 10,
  },
});
