import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MyTextInput from '../components/global/MyTextInput'
import Header from '../components/global/Header'
import { containerStyle } from '../styles/global'
import { useNavigation } from '@react-navigation/native'
import ProfileData from '../components/profile/ProfileData'

export default function ProfileScreen() {
  const navigation = useNavigation()
  return (
    <>
    <Header title='My Profile' back />
    <View style={containerStyle}>
         <ProfileData />
        <TouchableOpacity onPress={()=> navigation.navigate("login")}>
          <Text>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate("adminPanel")}>
          <Text>Admin Panel</Text>
        </TouchableOpacity>
      </View>
      </>
  )
}

const styles = StyleSheet.create({})