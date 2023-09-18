import { StyleSheet, Text, View } from 'react-native'
import React, {useState} from 'react'
import Header from '../../components/global/Header'
import { bodyStyle, containerStyle } from '../../styles/global'
import AddPlayerModal from '../../components/admin/addPlayer/AddPlayerModal'
import MyButton from '../../components/global/MyButton'

export default function AddPlayers() {
  const [playerName, setPlayerName] = useState("");
  const [players, setPlayers] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const addPlayerHandler = () => {
    let tempArr = [];
    tempArr.push({ name: playerName });
    setPlayers([...players, ...tempArr])
  };
  
  return (
    <>
      <Header title='Add Player' back />
      <View style={containerStyle}>
        <View style={bodyStyle}>
          <MyButton title='Add New Player' onPress={()=> setOpenModal(true)} />
          <AddPlayerModal openModal={openModal} setOpenModal={setOpenModal} playerName={playerName}
            setPlayerName={setPlayerName} onPressAdd={addPlayerHandler} />
          </View>
      </View>
      </>
  )
}

const styles = StyleSheet.create({})