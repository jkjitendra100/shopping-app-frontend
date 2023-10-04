import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import AdminHero from '../../components/admin/dashboard/AdminHero';
import DashboardCard from '../../components/admin/dashboard/DashboardCard';
import { bodyStyle, containerStyle } from '../../styles/global';
import { useNavigation } from '@react-navigation/native';

export default function AdminDashboard() {
  const navigation = useNavigation();
  return (
    <>
      <AdminHero />
      <ScrollView>
        <DashboardCard
          cardTitle="Add New Player"
          buttonTitle="Add"
          onPress={() => navigation.navigate('addPlayer')}
        />

        <DashboardCard
          cardTitle="All Players"
          buttonTitle="View"
          onPress={() => navigation.navigate('playersList')}
        />

        <DashboardCard
          cardTitle="Add New Match"
          buttonTitle="Add"
          onPress={() => navigation.navigate('newMatch')}
        />

        <DashboardCard
          cardTitle="All Matches"
          buttonTitle="View"
          onPress={() => navigation.navigate('adminMatches')}
        />

        <DashboardCard
          cardTitle="Fantasies"
          buttonTitle="Go"
          onPress={() => navigation.navigate('adminFantasies')}
        />

        <DashboardCard
          cardTitle="Custom claim"
          buttonTitle="GO"
          onPress={() => navigation.navigate('addPlayer')}
        />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({});
