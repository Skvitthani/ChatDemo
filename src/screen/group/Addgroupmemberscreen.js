import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {goBack} from '../../navigation/NavigateRef';
import {hp, ImageConst, Stringconst, wp} from '../../utils/helper/index';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Addgroupmemberscreen = ({route}) => {
  const GroupId = route?.params?.GroupId;
  const isFocuse = useIsFocused();

  const [groupData, setGroupData] = useState([]);
  const [userFriend, setUserFriend] = useState([]);

  console.log('group Daat', groupData);
  console.log("userFriend",userFriend);

  const onAuthStateChanged = user => {
    if (user) {
      const userId = user?._user?.uid;
      firestore()
        .collection('GroupChat')
        .doc(GroupId)
        .get()
        .then(snap => {
          setGroupData(snap.data());
        });

      firestore()
        .collection('Users')
        .doc(userId)
        .collection('Firends')
        .get()
        .then(snap => {
          const data = snap?.docs?.map(snp => {
            return snp.data();
          });
          console.log('data', data);
          setUserFriend(data);
        });
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, [isFocuse]);
  const groupUserId = groupData.ID;
  console.log('groupUserId', groupUserId);
  return (
    <View style={style.container}>
      <View style={style.headerStyle}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image source={ImageConst.arrow_png} style={style.headerImage} />
        </TouchableOpacity>
        <Text style={style.addGroupMember}>{Stringconst.addGroupMember}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    height: 30,
    width: 30,
    tintColor: 'white',
    marginTop: 10,
  },
  headerStyle: {
    backgroundColor: '#2B2D5E',
    height: hp(7),
    flexDirection: 'row',
    padding: 10,
  },
  addGroupMember: {
    marginTop: 13,
    color: 'white',
    marginLeft: wp(3),
    fontSize: 15,
    fontWeight: '500',
  },
});

export default Addgroupmemberscreen;
