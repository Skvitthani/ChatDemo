import React, {useEffect, useState} from 'react';
import {
  Image,
  Platform,
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
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import Userprofile from '../component/UserProfile';
import {ImageConst} from '../utils/helper/ImageConst';
import Modal from 'react-native-modal';
import Button from '../component/Button';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';

const Chatescreen = ({route, navigation}) => {
  const items = route?.params?.item;
  const currentUser = route?.params?.currentUser;
  const curentUserID = route?.params?.curentUserID;
  const reciverUID = items?.sendFrom;
  const group = route?.params?.groupData;
  // const curentUserID = route?.params?.onGroupcurentUserID;
  const UID = group?.id;
  console.log('group===>', group);
  console.log('ID===>', UID);
  console.log('itemsitems==', items);
  console.log('currentUsercurrentUser', currentUser);
  console.log('curentUserID', curentUserID);
  console.log('reciverUID', reciverUID);

  const [messages, setMessages] = useState([]);
  const [showChatScreen, setShowChatScreen] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const [image, setImage] = useState('');
  const [ImageUrl, setImageUrl] = useState('');
  const [lastMessage, setLastMessage] = useState('');
  const [groupLastMessage, setGroupLastMessage] = useState('');
  console.log('image Url===>', ImageUrl);

  useEffect(() => {
    if (group) {
      const snapShot = firestore()
        .collection('GroupChat')
        .doc(UID)
        .collection('Message')
        .orderBy('createdAt', 'desc');
      snapShot.onSnapshot(snp => {
        const message = snp.docs.map(snap => {
          return {...snap.data(), createdAt: new Date()};
        });
        console.log('messagemessage', message);
        setMessages(message);
      });
      const snp = firestore()
        .collection('GroupChat')
        .doc(UID)
        .collection('Message')
        .orderBy('createdAt', 'desc')
        .limit(1);
        snp.onSnapshot(snap=>{
          const GroupLastMessage = snap.docs.map(snap=>{
            return snap.data()
          })
          setGroupLastMessage(GroupLastMessage)
        })
    } else {
      const msgUID =
        curentUserID > reciverUID
          ? curentUserID + reciverUID + '123'
          : reciverUID + curentUserID + '123';
      const querySnapShot = firestore()
        .collection('Chats')
        .doc(msgUID)
        .collection('Message')
        .orderBy('createdAt', 'desc');
      querySnapShot.onSnapshot(snapShot => {
        const allMessages = snapShot.docs.map(snp => {
          return {...snp.data(), createdAt: new Date()};
        });
        setMessages(allMessages);
      });
      const snp = firestore()
        .collection('Chats')
        .doc(msgUID)
        .collection('Message')
        .orderBy('createdAt', 'desc')
        .limit(1);
      snp.onSnapshot(snap => {
        const lastmessage = snap.docs.map(snap => {
          return snap.data();
        });
        setLastMessage(lastmessage);
        console.log('lastMessage==>', lastMessage);
      });
    }
  }, []);

  const Users = {
    _id: curentUserID,
    name: currentUser?.name,
  };

  const onSend = async messagesArray => {
    console.log('messagesArray[0]messagesArray[0]==<', messagesArray[0]);
    const msg = messagesArray[0];
    console.log('messagesArray[0]messagesArray[0]==<', msg);
    if (group) {
      const myMeg = {
        ...msg,
        sender: curentUserID,
        image: ImageUrl,
      };
      console.log('myMegmyMeg=>', myMeg);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, myMeg),
      );
      firestore()
        .collection('GroupChat')
        .doc(UID)
        .collection('Message')
        .add(myMeg, {
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setImageUrl('');
    } else {
      const myMeg = {
        ...msg,
        sender: curentUserID,
        reciver: reciverUID,
        image: ImageUrl,
      };
      const msgUID =
        curentUserID > reciverUID
          ? curentUserID + reciverUID + '123'
          : reciverUID + curentUserID + '123';
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, myMeg),
      );
      firestore()
        .collection('Chats')
        .doc(msgUID)
        .collection('Message')
        .add(myMeg, {
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setImageUrl('');
    }
  };

  const onSendSned = async messagesArray => {
    console.log('messagesArray===>', messagesArray);
    console.log('USer', Users);
    if (group) {
      console.log('Group And Image');
      const myMeg = {
        _id: uuid.v4(),
        sender: curentUserID,
        image: messagesArray,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          ...Users,
        },
      };
      console.log('myMegmyMeg=>', myMeg);
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, myMeg),
      );
      firestore()
        .collection('GroupChat')
        .doc(UID)
        .collection('Message')
        .add(myMeg, {
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setImageUrl('');
    } else {
      console.log('personal');
      const myMeg = {
        _id: uuid.v4(),
        sender: curentUserID,
        reciver: reciverUID,
        image: messagesArray,
        createdAt: firestore.FieldValue.serverTimestamp(),
        user: {
          ...Users,
        },
      };
      const msgUID =
        curentUserID > reciverUID
          ? curentUserID + reciverUID + '123'
          : reciverUID + curentUserID + '123';
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, myMeg),
      );
      firestore()
        .collection('Chats')
        .doc(msgUID)
        .collection('Message')
        .add(myMeg, {
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setImageUrl('');
    }
  };

  const onUserProfilePress = () => {
    setShowProfile(!showProfile);
    setShowChatScreen(!showChatScreen);
  };

  const onBackPress = () => {
    console.log('last message', lastMessage);
    console.log('last GroupLastMessage', groupLastMessage);
    if (group) {
      firestore()
      .collection('GroupChat')
      .doc(UID)
      .update({
        lastmessage : groupLastMessage
      })
      navigation.navigate('Tabnavigate');
    } else {
      firestore()
        .collection('Users')
        .doc(curentUserID)
        .collection('Firends')
        .doc(reciverUID)
        .update({
          lastmessage: lastMessage,
        });
      firestore()
        .collection('Users')
        .doc(reciverUID)
        .collection('Firends')
        .doc(curentUserID)
        .update({
          lastmessage: lastMessage,
        });
      navigation.navigate('Tabnavigate');
    }
  };

  const onGallaryPress = () => {
    setOpenModel(true);
  };

  const onClosePress = () => {
    setOpenModel(false);
  };

  const onImageSlectPress = () => {
    ImageCropPicker.openPicker({
      width: responsiveScreenWidth(25),
      height: responsiveScreenHeight(17),
      cropping: true,
    }).then(image => {
      console.log('imageimage', image);
      let imageData = {
        image: image.path,
      };

      setImage(imageData);
      uploadImage(imageData);
      console.log('Image::', imageData);
      onClosePress();
    });
  };

  const uploadImage = async imageData => {
    // console.log('imageData==>', imageData);
    // console.log('imageData==>Hello', imageData?.image);
    const imagePath = imageData?.image;
    const reference = storage().ref(`${imagePath}`);
    // console.log('reference==>', reference?.path);
    const pathToFile = `${imagePath}`;
    await reference.putFile(pathToFile);

    const imageUrl = await storage()
      .ref(imagePath)
      .getDownloadURL()
      .then(url => {
        return url;
      });
    console.log('imageData==>++++++++++', imageUrl);
    setImageUrl(imageUrl);
    console.log('imageData==>++++++++++', ImageUrl);
    await onSendSned(imageUrl);
    console.log('image uri', ImageUrl);
    console.log('IMAGE', imageUrl);
  };

  return (
    <View style={style.mainView}>
      <Modal visible={openModel} animationType="slide">
        <View style={style.modelView}>
          <Button
            text={'Choose  From Gallary'}
            constButtonStyle={style.buttonView}
            containFontStyle={{marginRight: 30}}
            onPress={onImageSlectPress}
          />
          <Button
            text={'Cancle'}
            constButtonStyle={style.buttonView}
            containFontStyle={{marginRight: 60}}
            onPress={onClosePress}
          />
        </View>
      </Modal>
      {showChatScreen === true && (
        <View style={{flex: 1}}>
          <View style={style.headerStyle}>
            <View style={style.headerProfile}>
              <TouchableOpacity onPress={onBackPress}>
                <Image
                  source={ImageConst.arrow_png}
                  style={style.headerImage}
                />
              </TouchableOpacity>
              {group ? (
                <TouchableOpacity
                  onPress={onUserProfilePress}
                  style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: group?.data?.Photo}}
                    style={style.userProfile}
                  />
                  <Text style={style.messageFont}>
                    {group?.data?.GroupChat}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={onUserProfilePress}>
                  <Image
                    source={{uri: items?.Photo}}
                    style={style.userProfile}
                  />
                  <View>
                    <Text style={style.messageFont}>{items?.name}</Text>
                    <Text style={style.status}></Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity>
              <Image
                source={ImageConst.call_png}
                style={[style.headerImage, {marginRight: 5}]}
              />
            </TouchableOpacity>
          </View>
          <GiftedChat
            alwaysShowSend
            messages={messages}
            renderAvatar={null}
            renderUsernameOnMessage={true}
            onSend={messages => onSend(messages)}
            user={Users}
            renderBubble={props => {
              return (
                <Bubble
                  {...props}
                  wrapperStyle={{
                    left: {
                      backgroundColor: 'white',
                    },
                  }}
                />
              );
            }}
            renderSend={props => {
              return (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={onGallaryPress}>
                    <Image
                      source={ImageConst.gallery_png}
                      style={{
                        width: 22,
                        height: 22,
                        marginBottom: 11,
                        marginRight: 15,
                      }}
                    />
                  </TouchableOpacity>
                  <Send
                    {...props}
                    sendButtonProps={{
                      style: {
                        marginRight: 5,
                      },
                    }}>
                    <Image
                      source={ImageConst.send_message_png}
                      style={{width: 24, height: 24}}
                    />
                  </Send>
                </View>
              );
            }}
            renderInputToolbar={props => {
              return (
                <InputToolbar
                  {...props}
                  containerStyle={{
                    marginHorizontal: 10,
                    borderRadius: 10,
                    marginTop: Platform.OS === 'ios' ? 30 : 0,
                    marginBottom: 5,
                  }}
                />
              );
            }}
          />
        </View>
      )}
      {showProfile === true && (
        <Userprofile items={items} Group={group} onPress={onUserProfilePress} />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  inputStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    height: responsiveScreenHeight(5),
    marginHorizontal: responsiveScreenWidth(5),
    borderRadius: 15,
    marginVertical: 15,
  },
  messageSendBox: {
    backgroundColor: '#E0D5FE',
    marginTop: responsiveScreenHeight(3),
    marginLeft: responsiveScreenWidth(17),
    marginRight: responsiveScreenWidth(4),
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingVertical: 10,
  },
  headerStyle: {
    height:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(14)
        : responsiveScreenHeight(12),
    backgroundColor: '#2B2D5E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: Platform.OS === 'ios' ? 55 : 30,
  },
  messageFont: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 10,
  },
  headerImage: {
    height: 30,
    width: 30,
    tintColor: 'white',
    marginTop: 10,
  },
  modelView: {
    backgroundColor: 'white',
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    width: responsiveScreenWidth(35),
    height: responsiveScreenHeight(15),
    marginTop: responsiveScreenHeight(7),
    position: 'absolute',
    top: 0,
    right: responsiveScreenWidth(2),
  },
  userProfile: {
    height: responsiveScreenHeight(6.2),
    width: responsiveScreenWidth(14),
    borderRadius: 50,
    marginLeft: 20,
  },
  headerProfile: {
    flexDirection: 'row',
    width: responsiveScreenWidth(80),
  },
  latsSeen: {
    marginLeft: 30,
    color: 'white',
    marginTop: 5,
  },
  modelView: {
    backgroundColor: '#E5E5E5',
    alignSelf: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: responsiveScreenWidth(100),
    height: responsiveScreenHeight(20),
    position: 'absolute',
    bottom: responsiveScreenHeight(-2),
  },
  buttonView: {
    borderWidth: 0,
    backgroundColor: '#F42C7E',
    marginTop: responsiveScreenHeight(3),
    borderRadius: 10,
    marginHorizontal: responsiveScreenWidth(10),
    width: responsiveScreenWidth(78),
  },
});

export default Chatescreen;
