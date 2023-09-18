import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import { Portal, Button, PaperProvider } from 'react-native-paper';
import { Colors } from '../../../theme/Colors';
import MyTextInput from '../../global/MyTextInput';
import MyButton from '../../global/MyButton';
import CancelButton from '../../global/CancelButton';
import { cardHeading } from '../../../styles/global';

export default function AddPlayerModal({openModal = false, setOpenModal, playerName, setPlayerName, onPressAdd }) {
    return (
        <Modal visible={openModal} onDismiss={() => setOpenModal(false)}
            contentContainerStyle={styles.containerStyle} style={styles.modal} transparent={true}>
            <View style={styles.modelBackground} />
            <View style={styles.modelView1}>
            <View style={styles.modelView2}>
                <Text style={[cardHeading, {marginBottom: 50}]}>ADD NEW PLAYER</Text>
                <MyTextInput placeholder='Player name' value={playerName} onChangeText={setPlayerName} />
                <View style={{paddingVertical:25, flexDirection: "column", gap: 20}}>
                <MyButton title='+ ADD' onPress={onPressAdd} />
                    <CancelButton title='CANCEL' onPress={()=> setOpenModal(false)} />
                    </View>
                </View>
                </View>
            
        </Modal>
  )
}

const styles = StyleSheet.create({
    modal: {
        width: "100%", height: "100%"
    },

    containerStyle: {
        backgroundColor: Colors.red, padding: 20, height: "100%", borderWidth: 1, width: "100%",
        borderColor: Colors.grayLight, borderRadius: 5, overflow: "hidden", flexDirection: "column", 
    },

    modelBackground: {
                position: "absolute", top: 0, bottom: 0, backgroundColor: Colors.grayLight, left: 0, right: 0,
                opacity: 0.8,
    },
    
    modelView1: {
                height: "100%", justifyContent: "center",
                alignItems: "center", width: "100%"
    },
    modelView2: {
                flexDirection: 'column', gap: 10, justifyContent: "space-between", marginBottom: 50, padding: 20,
                 backgroundColor: Colors.white, margin: 20, width: "90%",
                 borderWidth: 1, borderColor: Colors.grayLight, elevation: 5, borderRadius: 10
            },
})