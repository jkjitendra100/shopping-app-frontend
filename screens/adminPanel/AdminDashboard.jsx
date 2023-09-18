import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AdminHero from '../../components/admin/dashboard/AdminHero'
import DashboardCard from '../../components/admin/dashboard/DashboardCard'
import { bodyStyle, containerStyle } from '../../styles/global'
import { useNavigation } from '@react-navigation/native'

export default function AdminDashboard() {
  const navigation = useNavigation()
  return (
    <View>
          <AdminHero />
          <View style={bodyStyle}>
        <DashboardCard cardTitle='New Player' buttonTitle='Add'
          onPress={() => navigation.navigate("addPlayer")} />
        <DashboardCard cardTitle='Custom claim' buttonTitle='GO'
         onPress={() => navigation.navigate("addPlayer")} />
              </View>
    </View>
  )
}

const styles = StyleSheet.create({})