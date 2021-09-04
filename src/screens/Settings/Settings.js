import React,{useState,useEffect} from 'react';
import {StyleSheet, Text, View,TouchableOpacity,FlatList,Pressable} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native';
// import {AuthContext} from '../navigation/AuthProvider';
// import {logout} from '../redux/actions/user'
// import {useDispatch,useSelector} from 'react-redux'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const LisData=[
    {icon:'receipt',title:'Hồ sơ',nav:'ProfileUser'},
    {icon:'heart',title:'App reviews',nav:'ProfileUser'},
    {icon:'star',title:'Share',nav:'ProfileUser'},
    {icon:'gift' ,title:'Support',nav:'ProfileUser'},
    {icon:'reader',title:'Version',nav:'ProfileUser'},
  ]
const ItemSettings = ({item,navigation})=>(
    <Pressable style={styles.settingItem} onPress={() =>navigation.navigate(item.nav)}>
      <Icon style={styles.iconSetting} name={item.icon} size={20} color='black'/>
      <Text style={styles.titleItemSetting} >{item.title}</Text>
      <View style={styles.iconMore}>
        <Icon  name={'chevron-forward-outline'} size={20} color='black'/>
      </View>
    </Pressable>
  )
export default function Settings() {
    const navigation= useNavigation()
    const [user, setUser] = useState({})
    console.log(user)
    useEffect(() => {
        const uidUserNow =auth().currentUser.uid
      firestore().collection('users').get()
      .then(querySnapshot => {
      var user = {};
      querySnapshot.forEach(doc => {
          if(doc.data().uid === uidUserNow)
                user= {...doc.data()}
      });
      setUser(user);
    });
  }, []);
    const logoutUser = async ()=> {
    try {
        await auth().signOut();
    } catch (e) {
        console.error(e);
    }
    };
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Avatar
          size={65}
          rounded
          source={{
                uri: user.imageAvatar||
                'https://image.flaticon.com/icons/png/512/149/149071.png',
              }}
          containerStyle={styles.imageAvatar}
        />
        <View style={styles.profileTitle}>
          {/* <Text style={styles.fullName}>❤ {user.email}</Text> */}
          <Text style={styles.fullName} numberOfLines={1} ellipsizeMode="tail">❤ {user.displayName || ''}</Text>
          <View style={styles.follower}>
            <Text style={{fontSize: 14, marginRight:10}}>
                <Text style={{fontWeight: 'bold'}}>31 </Text>
                 đang Follow</Text>
            <Text style={{fontSize: 14, marginRight:10}}>
                <Text style={{fontWeight: 'bold'}}>2 </Text>
                 Follower</Text>
          </View>
        </View>
      </View>
      <View style={styles.optionSettings}>
        <FlatList
          data={LisData}
          renderItem={({item})=><ItemSettings item={item} navigation={navigation}/>}
          keyExtractor={(item,index)=>index}
        />
      </View>
      <Button 
        buttonStyle={styles.buttonLogout}
        titleStyle={styles.buttonLogoutTitle}
        onPress={()=>
        {
            logoutUser()
        }

        }
        title={'Đăng Xuất'}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  imageAvatar: {
    marginLeft: 20,
    elevation: 5,
  },
  profileTitle: {
    flex:1,
    paddingHorizontal: 10,
    // backgroundColor: 'red'
  },
  fullName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  follower: {
      marginTop:4,
    //   backgroundColor: 'red',
    flexDirection: 'row',
  },
  optionSettings: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 5,
    backgroundColor: 'white',
  },
  settingItem:{
    flexDirection: 'row',
    paddingVertical:16,
    borderBottomWidth:0.4,
    borderBottomColor:'#d1e6e2'
  },
  iconSetting:{
    
  },
  iconMore:{
      flex:1,
      alignItems:'flex-end',
    //   backgroundColor: 'red'
  },
  titleItemSetting:{
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonLogout:{
    marginHorizontal:10,
    marginVertical:20,
    borderRadius:10,
    backgroundColor: '#09bff2'
  },
  buttonLogoutTitle:{
    fontSize: 16,
  }
});