import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { Avatar } from "react-native-elements";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const ItemRoomChat = ({item}) => {
    const [userReceiver,setUserReceiver] =useState({})
    useEffect(() => {
        const sub = firestore()
      .collection('users')
      .doc('nnsdLDQQiIT4K1MY6GVQ')
      .onSnapshot(doc => { 
        setUserReceiver({...doc.data()});
      });
        return () => {
            sub()
        }
    }, [])
    return (
        <TouchableOpacity style={styles.itemMessage}>
              <Avatar
                source={{
                  uri: userReceiver.imageAvatar||
                  'https://image.flaticon.com/icons/png/512/149/149071.png',
                }}
                size={50}
                rounded
              />
              <View style={{paddingLeft: 10}}>
                <Text style={styles.nameFriendMessage}>{userReceiver.displayName}</Text>
                <Text style={styles.lastMessage}>Bạn: {item.lastMessage.text}</Text>
              </View>
            </TouchableOpacity>
    )
}

export default ItemRoomChat

const styles = StyleSheet.create({
    itemMessage: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  nameFriendMessage: {
    fontSize: 16,
    color: '#000',
  },
  lastMessage: {
    marginTop: 4,
    color: 'gray',
  },
})