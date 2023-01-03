import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {ImageConst} from '../utils/helper/ImageConst';
import Notificationservice from '../../Notificationservice';
import uuid from 'react-native-uuid';

const Callscreen = () => {
  const [userData, setUserData] = useState([]);
  const [activeUserId, setActiveUserID] = useState('');
  const [activeUser, setActiveUser] = useState('');
  const [isVoiceCall, setIsVoiceCall] = useState(true);
  console.log('isVoiceCall=>', isVoiceCall);
  console.log('activeUser==>', activeUser);

  const isFocuse = useIsFocused();
  const navigation = useNavigation();

  const onAuthStateChanged = async user => {
    if (user) {
      const userUId = user?._user?.uid;
      setActiveUserID(userUId);
      firestore()
        .collection('Users')
        .doc(userUId)
        .get()
        .then(querySnapshot => {
          setActiveUser(querySnapshot.data());
        });
      firestore()
        .collection('Users')
        .doc(userUId)
        .collection('Firends')
        .get()
        .then(querySnapshot => {
          const data = querySnapshot?.docs?.map(snp => {
            return snp?.data();
          });
          setUserData(data);
        });
    } else {
      console.log('User not available');
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, [isFocuse]);

  const onVideoCallPress = async item => {
    setIsVoiceCall(false);
    let CallId = uuid.v4();
    let notification = {
      title: activeUser?.name,
      body: 'Video Call',
      token: item?.Token,
      CallId: CallId,
      Photo: activeUser?.Photo,
    };
    Notificationservice.sendSingleDiveceNotifiaction(notification);
    console.log('item==>', item);
    navigation.navigate('Videocallscreen', {
      CallerId: CallId,
      userName: activeUser,
    });
  };

  const onVoiceCallPress = async item => {
    setIsVoiceCall(true);
    let CallId = uuid.v4();
    let notification = {
      title: activeUser?.name,
      body: 'Voice Call',
      token: item?.Token,
      CallId: CallId,
      Photo: activeUser?.Photo,
    };
    Notificationservice.sendSingleDiveceNotifiaction(notification);
    console.log('item==>', item);
    navigation.navigate('Voicecallscreen', {
      CallerId: CallId,
      userName: item?.name,
    });
  };
  return (
    <View style={style.mainStyle}>
      <FlatList
        data={userData}
        renderItem={({item}) => {
          return (
            <View style={style.listView}>
              <View style={{padding: 10, flexDirection: 'row'}}>
                <Image source={{uri: item?.Photo}} style={style.userProfile} />
                <Text style={style.listUserName}>{item?.name}</Text>
              </View>
              <View style={{flexDirection: 'row', padding: 10}}>
                <TouchableOpacity onPress={() => onVideoCallPress(item)}>
                  <Image source={ImageConst.zoom_png} style={style.videoCall} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onVoiceCallPress(item)}>
                  <Image source={ImageConst.call_png} style={style.voiceCall} />
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
  userProfile: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(13),
    borderRadius: 50,
  },
  listUserName: {
    fontSize: 20,
    marginLeft: 30,
    marginTop: 3,
  },
  mainStyle: {
    flex: 1,
  },
  videoCall: {
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(8),
    marginRight: responsiveScreenWidth(5),
  },
  voiceCall: {
    height: responsiveScreenHeight(3),
    width: responsiveScreenWidth(6.5),
    marginTop: responsiveScreenHeight(0.5),
  },
  listView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Callscreen;
