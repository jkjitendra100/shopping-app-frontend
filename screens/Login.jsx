import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/global/Header'
import { bodyStyle, containerStyle } from '../styles/global'
import { Colors } from '../theme/Colors'
import MyTextInput from '../components/global/MyTextInput'
import MyButton from '../components/global/MyButton'
import logo from "../assets/logo.png"

export default function Login() {
  const [otpSent, setOtpSent] = useState(false)
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")

  const sendOtpHandler = () => {
    alert("OTP SENT")
  }

  const resendOtpHandler = () => {

  }

  return (
    <>
    <Header title='Login' back />
      <View style={[containerStyle, {flex: 1} ]}>
        <View style={[bodyStyle, {overflow: "hidden"}]}>
         <View style={{height: "50%", alignItems: "center", justifyContent: "center"}}>
            <Image style={styles.logo} source={logo} />
            <Text style={{color: Colors.blueDark, fontWeight: 'bold', fontSize: 20}}>BATING APP</Text>
          </View>
          
        {!otpSent ?  <View style={{flexDirection: "column", gap: 50, alignItems: "center", height: "50%" }}>
            <MyTextInput placeholder='Enter mobile no. (10 digits)' value={mobile} onChangeText={setMobile}
              style={{ fontSize: 20, textAlign: "center" }} keyboardType="numeric" maxLength={10} />

            <MyButton title='SEND OTP' onPress={sendOtpHandler} />
          </View>
          :
          <View style={{flexDirection: "column", gap: 50, alignItems: "center", height: "50%" }}>
            <MyTextInput placeholder='Enter 6 digits OTP' value={otp} onChangeText={setOtp}
              style={{ fontSize: 20, textAlign: "center" }} keyboardType="numeric" maxLength={6} />

              <MyButton title='VERIFY' onPress={sendOtpHandler} />
              
              <TouchableOpacity onPress={resendOtpHandler}>
                <Text style={{color: Colors.blue}}>RESEND OTP</Text>
              </TouchableOpacity>
            </View>}
      </View>
    </View>
      </>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: 100, height: 100, marginBottom: 20
  }
})