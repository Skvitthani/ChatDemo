import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { ImageConst } from '../../utils/helper/ImageConst';
import { hp, wp } from '../../utils/helper/globalfunction/Responsivefont';

const Userlistscreen = () => {
  const [userData, setUserData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [inputShow, setInputShow] = useState(false);
  const [searchTxt, setSearchTxt] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const [currentUserId ,setCurrentUserId] = useState('')
  const [firend, setFirend] = useState([]);
  const navigation = useNavigation()

  console.log("firend==>",firend);
  console.log("currentUser==>",currentUser);

  const isFocuse = useIsFocused();

  const onAuthStateChanged = async user => {
    if (user) {
      const userUId = user?._user?.uid;
      setCurrentUserId(userUId)
      firestore()
        .collection('Users')
        .doc(userUId)
        .get()
        .then(querySnapshot => {
          setCurrentUser(querySnapshot.data());
        });
      firestore()
        .collection('Users')
        .where('userId', '!=', userUId)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot?.docs;
          console.log('data', data);
          setUserData(data);
          setSearchData(data);
        });
        firestore()
        .collection('Users')
        .doc(userUId)
        .collection('Firends')
        .get()
        .then(snp => {
          const data = snp?.docs?.map(snap => {
            return snap?.data();
          });
          setFirend(data);
          console.log('datadata==>', data);
        });
    } else {
      console.log('User not available');
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, [isFocuse]);

  console.log('firend===>', firend);

  const onSearchPress = () => {
    setInputShow(!inputShow);
  };
  const searchFilterFunction = txt => {
    if (txt) {
      const newData = userData.filter(item => {
        return item?._data?.name.toUpperCase().includes(txt.toUpperCase());
      });
      setUserData(newData);
      setSearchTxt(txt);
    } else {
      setUserData(searchData);
      setSearchTxt(txt);
    }
  };

  const onAddUserPress = item => {
    console.log('add user id', item);
    const ID = item?._data?.userId;
    firestore().collection('Firends').add({
      sendTo: ID,
      sendFrom: currentUserId,
      Photo: currentUser?.Photo,
      name: currentUser?.name,
      Token : currentUser?.Token
    });
  };
  // console.log('currentUsercurrentUser', currentUser);

  const name = firend.map(item => {
    if (item?.name) {
      return item?.name;
    }
  });
  // console.log('namename', name);

  const onbackPress = () => {
    navigation.navigate('Tabnavigate')
  }
  const onGroupPress = () => {
    navigation.navigate('Groupscreen')
  }

  return (
    <View style={{flex: 1}}>
      {inputShow === false ? (
        <View style={style.headerStyle}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={onbackPress}>
              <Image
                source={ImageConst.arrow_png}
                style={style.headerImage}
              />
            </TouchableOpacity>
            <View style={{marginLeft: wp(5)}}>
              <Text style={{color: 'white', fontSize: 17}}>Select User</Text>
              <Text style={{color: 'white', fontSize: 15}}>
                {userData?.length} User
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={onSearchPress}>
            <Image
              source={ImageConst.search_interface_symbol_png}
              style={style.searchIcon}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={style.inputView}>
          <TouchableOpacity onPress={onSearchPress}>
            <Image
              source={ImageConst.arrow_png}
              style={{
                height: hp(3),
                width: wp(7),
              }}
            />
          </TouchableOpacity>
          <TextInput
            value={searchTxt}
            style={style.inputStyle}
            onChangeText={txt => searchFilterFunction(txt)}
          />
        </View>
      )}
      <ScrollView>
        {inputShow === false && (
          <View>
            <TouchableOpacity style={style.messageListStyle} onPress={onGroupPress}>
              <View style={style.contectView}>
                <Image
                  source={ImageConst.group_png}
                  style={style.contectImage}
                />
              </View>
              <Text style={style.listUserName}>New Group</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.messageListStyle}>
              <View style={style.contectView}>
                <Image
                  source={ImageConst.add_user_png}
                  style={style.contectImage}
                />
              </View>
              <Text style={style.listUserName}>New Contact</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.messageListStyle}>
              <View style={style.contectView}>
                <Image
                  source={ImageConst.multiple_users_silhouette_png}
                  style={style.contectImage}
                />
              </View>
              <Text style={style.listUserName}>New community</Text>
            </TouchableOpacity>
          </View>
        )}
        <Text style={style.users}>Users</Text>
        <View style={{flexDirection: 'row', flex: 1}}>
          <FlatList
            data={userData}
            renderItem={({item}) => {
              console.log('itemitem', item);
              return (
                <View
                  style={[
                    style.messageListStyle,
                    {justifyContent: 'space-between'},
                  ]}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: item?._data?.Photo}}
                      style={style.userProfile}
                    />
                    <Text style={style.listUserName}>{item?._data?.name}</Text>
                  </View>
                  {name.includes(item?._data?.name) ? (
                    <Image
                      source={ImageConst.images_removebg_preview_png}
                      style={style.firends}
                    />
                  ) : (
                    <TouchableOpacity
                      style={{alignSelf: 'center'}}
                      onPress={() => onAddUserPress(item)}>
                      <Image
                        source={ImageConst.add_friend_png}
                        style={style.addFirend}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  headerStyle: {
    height: hp(14),
    backgroundColor: '#2B2D5E',
    paddingHorizontal: 10,
    paddingTop: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputView: {
    height: hp(12),
    flexDirection: 'row',
    paddingTop: hp(6),
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
  },
  headerImage: {
    height: 30,
    width: 30,
    tintColor: 'white',
    marginTop: 5,
  },
  messageListStyle: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  listUserName: {
    fontSize: 20,
    marginLeft: 30,
    alignSelf: 'center',
  },
  userProfile: {
    height: hp(6),
    width: wp(13),
    borderRadius: 50,
  },
  flexDirection: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contectView: {
    height: hp(5),
    width: wp(11.5),
    borderRadius: 20,
    backgroundColor: '#2B2D5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contectImage: {
    height: hp(3),
    width: wp(6),
    tintColor: 'white',
  },
  searchIcon: {
    height: hp(3.2),
    width: wp(7),
    marginTop: hp(1),
    marginRight: wp(2),
    tintColor: 'white',
  },
  inputStyle: {
    borderWidth: 1,
    height: hp(4),
    width: wp(80),
  },
  addFirend: {
    height: hp(2.3),
    width: wp(5),
  },
  firends: {
    height: hp(3),
    width: wp(6),
    alignSelf: 'center',
  },
  users: {
    fontSize: 25,
    fontWeight: '700',
    color: '#2B2D5E',
    marginLeft: 5,
  },
});

export default Userlistscreen;
