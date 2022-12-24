import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  responsiveHeight,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {ImageConst} from '../utils/helper/ImageConst';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Tabnavigate from '../navigation/Tabnavigate';

const Customheader = () => {
  const [Header, setHeader] = useState('');
  const isFocuse = useIsFocused();
  const navigation = useNavigation();

  const onAuthStateChanged = async user => {
    if (user) {
      const userUId = user?._user?.uid;
      firestore()
        .collection('Users')
        .doc(userUId)
        .get()
        .then(querySnapshot => {
          setHeader(querySnapshot.data());
        });
    } else {
      console.log('User not available');
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, [isFocuse]);

  const onNotificationPress = () => {
    navigation.navigate('Notificationscreen');
  };

  const onOptionPress = () => {
    navigation.navigate('Settingscreen');
  };
  return (
    <View style={style.headerStyle}>
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri: Header?.Photo}} style={style.userProfile} />
        <Text style={style.activeUserName}>{Header?.name}</Text>
      </View>
      <View style={style.imageView}>
        <TouchableOpacity onPress={onNotificationPress}>
          <Image source={ImageConst.bell_png} style={style.notification} />
        </TouchableOpacity>
        <TouchableOpacity style={style.logOut} onPress={onOptionPress}>
          <Image source={ImageConst.options_png} style={style.optionStyle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  userProfile: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(13),
    borderRadius: 50,
  },
  headerStyle: {
    height:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(14)
        : responsiveScreenHeight(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(6.5)
        : responsiveScreenHeight(4),
    backgroundColor: '#2B2D5E',
  },
  activeUserName: {
    fontSize: 20,
    color: 'white',
    marginLeft: 30,
    marginTop: 10,
  },
  optionStyle: {
    height: responsiveScreenHeight(4),
    width: responsiveScreenWidth(6),
    tintColor: 'white',
  },
  notification: {
    height: responsiveScreenHeight(3),
    width: responsiveScreenWidth(6),
    tintColor: 'white',
    marginTop: responsiveScreenHeight(0.5),
  },
  imageView: {
    flexDirection: 'row',
    width: responsiveScreenWidth(25),
    justifyContent: 'space-around',
  },
});

export default Customheader;
