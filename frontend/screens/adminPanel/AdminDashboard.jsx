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
            cardTitle="Add New Player"
            buttonTitle="Click here"
            onPress={() => navigation.navigate('addPlayer')}
          />

          <DashboardCard
            cardTitle="View All Players"
            buttonTitle="Click here"
            onPress={() => navigation.navigate('playersList')}
          />

          <DashboardCard
            cardTitle="Add New Match"
            buttonTitle="Click here"
            onPress={() => navigation.navigate('newMatch')}
          />

          <DashboardCard
            cardTitle="View All Matches"
            buttonTitle="Click here"
            onPress={() => navigation.navigate('adminMatches')}
          />

          <DashboardCard
            cardTitle="View All Fantasies"
            buttonTitle="Click here"
            onPress={() => navigation.navigate('adminFantasies')}
          />

          <DashboardCard
            cardTitle="View All Users"
            buttonTitle="Click here"
            onPress={() => navigation.navigate('adminFantasies')}
          />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
