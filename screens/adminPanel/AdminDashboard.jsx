import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import AdminHero from '../../components/admin/dashboard/AdminHero';
import DashboardCard from '../../components/admin/dashboard/DashboardCard';
import { bodyStyle } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';

export default function AdminDashboard() {
  const navigation = useNavigation();
  return (
    <>
      <AdminHero />
      <View style={[bodyStyle, { flex: 1 }]}>
        <ScrollView>
          <DashboardCard
            cardTitle="Add New Product"
            buttonTitle="Click here"
            onPress={() => navigation.navigate('newProduct')}
          />

          <DashboardCard
            cardTitle="All Products"
            buttonTitle="Click here"
            onPress={() => navigation.navigate('adminProducts')}
          />

          <DashboardCard
            cardTitle="All Orders"
            buttonTitle="Click here"
            onPress={() => navigation.navigate('adminOrders')}
          />

          <DashboardCard
            cardTitle="All Users"
            buttonTitle="Click here"
            onPress={() => navigation.navigate('adminProducts')}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
