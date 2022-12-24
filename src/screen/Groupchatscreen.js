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
import moment from 'moment';

const Groupchatscreen = () => {
  const [group, setGroup] = useState([]);
  const [activeUserId, setActiveUserId] = useState('');
  const [activeUser, setActiveuser] = useState([]);
  const navigation = useNavigation();

  const isFocuse = useIsFocused();

  const onAuthStateChanged = async user => {
    if (user) {
      const userUId = user?._user?.uid;
      setActiveUserId(userUId);
      firestore()
        .collection('Users')
        .doc(userUId)
        .get()
        .then(querySnapshot => {
          setActiveuser(querySnapshot.data());
        });
      firestore()
        .collection('GroupChat')
        .get()
        .then(querySnapshot => {
          console.log('querySnapshot==>', querySnapshot.docs);
          const data = querySnapshot.docs.map(snp => {
            if (snp.data()?.ID?.includes(userUId)) {
              return {
                id: snp.id,
                data: snp.data(),
              };
            }
          });
          console.log('datadata==>', data);
          setGroup(data);
        });
    } else {
      console.log('User not available');
    }
  };

  console.log('group==>', group);

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, [isFocuse]);

  const onGroupChatPress = item => {
    console.log('item==>', item);
    navigation.navigate('Chatescreen', {
      groupData: item,
      curentUserID: activeUserId,
      currentUser: activeUser,
    });
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={group}
        renderItem={({item}) => {
          console.log('item==>', item?.data?.lastmessage[0]);
          return (
            <View>
              <TouchableOpacity
                style={style.messageListStyle}
                onPress={() => onGroupChatPress(item)}>
                <View style={{flexDirection : 'row'}}>
                  <View>
                    <Image
                      source={{uri: item?.data?.Photo}}
                      style={style.userProfile}
                    />
                  </View>
                  <View>
                    <Text style={style.listUserName}>
                      {item?.data?.GroupChat}
                    </Text>
                    {item?.data?.lastmessage[0]?.image === '' ? (
                      <Text style={{marginLeft: 30, marginTop: 2}}>
                        {item?.data?.lastmessage[0]?.text}
                      </Text>
                    ) : (
                      <View style={{flexDirection: 'row', marginTop: 5}}>
                        <Image
                          source={ImageConst.gallery_png}
                          style={{
                            height: responsiveScreenHeight(1.8),
                            width: responsiveScreenWidth(4),
                            marginLeft: 30,
                          }}
                        />
                        <Text style={{marginLeft: 5}}>Photo</Text>
                      </View>
                    )}
                  </View>
                </View>
                <View style={{marginTop: 5}}>
                  <Text>
                    {moment(item?.data?.lastmessage[0]?.createdAt).format(
                      'DD MMM YYYY',
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  messageListStyle: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    justifyContent : 'space-between'
  },
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
});

export default Groupchatscreen;
