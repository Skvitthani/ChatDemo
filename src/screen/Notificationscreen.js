import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {ImageConst} from '../utils/helper/ImageConst';

const Notificationscreen = ({navigation}) => {
  const [activeUser, setActiveUser] = useState();
  const [activeUserUID, setActiveUserUID] = useState();
  const [matchRequest, setMatchRequest] = useState([]);
  const [matchId, setMatchId] = useState([]);

  const isFocuse = useIsFocused();

  const onAuthStateChanged = async user => {
    if (user) {
      const userUId = user?._user?.uid;
      setActiveUserUID(userUId);
      firestore()
        .collection('Users')
        .doc(userUId)
        .get()
        .then(snp => {
          console.log('snp', snp?.data());
          setActiveUser(snp?.data());
        });
      console.log('userUIduserUId', userUId);
      firestore()
        .collection('Firends')
        .where('sendTo', '==', userUId)
        .get()
        .then(querySnapshot => {
          const data = querySnapshot?.docs?.map(snp => {
            return snp?.data();
          });
          console.log('data', data);
          setMatchRequest(data);
          const id = querySnapshot?.docs?.map(snp => {
            return snp?.id;
          });
          console.log('id', id);
          setMatchId(id);
        });
    }
  };
  console.log('activeUserUID==>', activeUserUID);

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, [isFocuse]);

  console.log('active user', activeUser);

  const onAddPress = (item, index) => {
    console.log('indexindex', index);
    console.log('item', item?.sendFrom);
    firestore()
      .collection('Users')
      .doc(activeUserUID)
      .collection('Firends')
      .doc(item?.sendFrom)
      .set(item);
    firestore()
      .collection('Users')
      .doc(item?.sendFrom)
      .collection('Firends')
      .doc(activeUserUID)
      .set({
        Photo: activeUser?.Photo,
        name: activeUser?.name,
        sendFrom: activeUser?.userId,
        sendTo: item?.sendFrom,
      });

    const deleteId = matchId?.filter((id, indexs) => {
      if (indexs === index) {
        return id;
      }
    });
    const id = deleteId[0];
    console.log('deleteIddeleteId', id);

    firestore().collection('Firends').doc(id).delete();
  };

  const onCancelPress = (item, index) => {
    const deleteId = matchId?.filter((id, indexs) => {
      if (indexs === index) {
        return id;
      }
    });
    const id = deleteId[0];
    console.log('deleteIddeleteId', id);

    firestore().collection('Firends').doc(id).delete();
  };

  const onbackPress = () => {
    navigation.navigate('Tabnavigate');
  };

  return (
    <View style={{flex: 1}}>
      <View style={style.headerstyle}>
        <TouchableOpacity onPress={onbackPress}>
          <Image source={ImageConst.arrow_png} style={style.headerImage} />
        </TouchableOpacity>
        <Text style={style.ProfileStyle}>Request</Text>
      </View>
      <FlatList
        data={matchRequest}
        renderItem={({item, index}) => {
          //   console.log('items======', item);
          return (
            <View style={style.messageListStyle}>
              <View style={{flexDirection: 'row'}}>
                <Image source={{uri: item?.Photo}} style={style.userProfile} />
                <Text style={style.listUserName}>{item?.name}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() => onAddPress(item, index)}>
                  <Image
                    source={ImageConst.add_friend_png}
                    style={{
                      height: responsiveScreenHeight(2.3),
                      width: responsiveScreenWidth(5),
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{alignSelf: 'center'}}
                  onPress={() => onCancelPress(item, index)}>
                  <Image
                    source={ImageConst.cancel_png}
                    style={{
                      height: responsiveScreenHeight(2.3),
                      width: responsiveScreenWidth(5),
                      marginLeft: 10,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  headerstyle: {
    backgroundColor: '#2B2D5E',
    height: responsiveScreenHeight(10),
    paddingTop: responsiveScreenHeight(5),
    paddingLeft: responsiveScreenWidth(5),
    flexDirection: 'row',
  },
  ProfileStyle: {
    fontWeight: '600',
    fontSize: 20,
    marginLeft: 20,
    marginTop: 5,
    color: 'white',
  },
  headerImage: {
    height: 25,
    width: 25,
    tintColor: 'white',
    marginTop: 5,
  },
  messageListStyle: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  listUserName: {
    fontSize: 20,
    marginLeft: 30,
    alignSelf: 'center',
  },
  userProfile: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(13),
    borderRadius: 50,
  },
});

export default Notificationscreen;
