import React,{useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
  Pressable
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ItemPostGroups from './ItemPostGroups';
import Header from "./Header";
import { useNavigation } from "@react-navigation/native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const Groups = () => {
    const navigation = useNavigation();
    const [myGroups, setMyGroups] = React.useState([]);
    useEffect(() => {
        firestore().collection('groups').where('members', 'array-contains', auth().currentUser.uid).onSnapshot(querySnapshot => {
            const groups = [];
            querySnapshot.forEach(doc => {
                groups.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setMyGroups(groups);
        });
    }, [])
  return (
    <View style={styles.container}>
      <Header/>
      <ScrollView>
        <View style={{marginVertical: 10}}>
          <FlatList
            data={myGroups}
            horizontal
            renderItem={({item}) => (
              <Pressable style={styles.itemGroup}
                onPress={() => navigation.navigate('StackGroups',{ screen: 'DetailGroup', params:{id:item.id}})}
              >
                <Image
                  source={{
                    uri: item.imageCover || 'https://images6.alphacoders.com/102/1029037.jpg',
                  }}
                  style={styles.imgGroup}
                />
                <Text style={styles.nameGroup} numberOfLines={2}>
                  {item.name}
                </Text>
              </Pressable>
            )}
            keyExtractor={index => index.toString()}
          />
        </View>
        <ItemPostGroups />
        <ItemPostGroups />
      </ScrollView>
    </View>
  );
};

export default Groups;

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  itemGroup: {
    width: width / 4,
    marginLeft: 10,
  },
  imgGroup: {
    width: width / 4,
    height: width / 4,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  nameGroup: {
    padding: 4,
    fontSize: 14,
  },
});