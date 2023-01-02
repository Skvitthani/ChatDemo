import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {useIsFocused} from '@react-navigation/native';
import {ImageConst} from '../utils/helper/ImageConst';
import Modal from 'react-native-modal';
import Button from '../component/Button';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';

const Creategroup = ({route, navigation}) => {
  const user = route?.params?.paricipant;
  console.log('user', user);

  const [groupName, setGroupName] = useState('');
  const [activeUser, setActiveUser] = useState();
  const [userID, setUserID] = useState([]);
  const [Users, setUsers] = useState(user);
  const [openModel, setOpenModel] = useState(false);
  const [image, setImage] = useState('');
  // console.log('image==>', image);
  console.log('UsersUsers', Users);

  // console.log('UIDUID', userID);

  console.log(activeUser);
  console.log('activeUseractiveUser', activeUser);

  console.log('groupName', groupName);

  const onAuthStateChanged = user => {
    if (user) {
      const userUId = user?._user?.uid;
      setUserID([userUId]);
      console.log(userUId);
      firestore()
        .collection('Users')
        .doc(userUId)
        .get()
        .then(querySnapshot => {
          setActiveUser(querySnapshot.data());
        });
    }
  };

  const isFocuse = useIsFocused();
  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged);
  }, [isFocuse]);

  const onBackPress = () => {
    navigation.navigate('Groupscreen');
  };

  const onCreateGroupPress = async () => {
    const imagePath = image?.image;
    const reference = storage().ref(`${imagePath}`);
    console.log('reference', reference?.path);
    const pathToFile = `${imagePath}`;
    await reference.putFile(pathToFile);
    user?.map(i => {
      if (i?.sendFrom) {
        userID.push(i?.sendFrom);
      }
    });
    console.log('UIDUID', userID);
    const ID = userID?.join('-');
    console.log('activeUser', activeUser);
    Users.push(activeUser);
    console.log('after push', Users);
    const ImageUrl = await storage()
      .ref(imagePath)
      .getDownloadURL()
      .then(url => {
        return url;
      });
    console.log('URL', ImageUrl);
    let newData = [
      ...Users,
    ]

    firestore()
      .collection('GroupChat')
      .doc(ID)
      .set({
        Photo: ImageUrl,
        ID: userID,
        GroupChat: groupName,
        GroupData: newData,
      });

    setGroupName('');
    navigation.navigate('Tabnavigate');
  };

  const onCameraPress = () => {
    setOpenModel(!openModel);
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
      console.log('Image::', imageData);
      onCameraPress();
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ECECEC'}}>
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
            onPress={onCameraPress}
          />
        </View>
      </Modal>
      <View style={style.headerstyle}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={onBackPress}>
            <Image source={ImageConst.arrow_png} style={style.headerImage} />
          </TouchableOpacity>
          <View style={{marginLeft: responsiveScreenWidth(5), marginTop: 8}}>
            <Text style={{color: 'white', fontSize: 20}}>New Group</Text>
          </View>
        </View>
        <TouchableOpacity style={style.addGroup} onPress={onCreateGroupPress}>
          <Image
            source={ImageConst.plus_png}
            style={{height: 20, width: 20, tintColor: 'white'}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          height: responsiveScreenHeight(12),
          backgroundColor: 'white',
          flexDirection: 'row',
          padding: 10,
        }}>
        <TouchableOpacity style={style.GroupImageView} onPress={onCameraPress}>
          {image ? (
            <Image
              source={{uri: image?.image}}
              style={{
                height: responsiveScreenHeight(9),
                width: responsiveScreenWidth(20),
                borderRadius: 50,
              }}
            />
          ) : (
            <Image
              source={ImageConst.camera}
              style={{
                height: responsiveScreenHeight(3),
                width: responsiveScreenWidth(8),
              }}
            />
          )}
        </TouchableOpacity>

        <TextInput
          placeholder="Enter Group Name"
          placeholderTextColor={'black'}
          value={groupName}
          onChangeText={txt => setGroupName(txt)}
          style={style.inputStyle}
        />
      </View>
      <Text style={{fontSize: 15, padding: 15}}>
        Participants: {user?.length}
      </Text>
      <FlatList
        horizontal
        data={user}
        renderItem={({item}) => {
          return (
            <View style={{marginHorizontal: 10}}>
              <Image source={{uri: item?.Photo}} style={style.userProfile} />
              <Text>{item?.name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};
const style = StyleSheet.create({
  headerImage: {
    height: 30,
    width: 30,
    tintColor: 'white',
    marginTop: 5,
  },
  headerstyle: {
    backgroundColor: '#2B2D5E',
    height:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(12)
        : responsiveScreenHeight(11),
    paddingTop:
      Platform.OS === 'ios'
        ? responsiveScreenHeight(6)
        : responsiveScreenHeight(4),
    paddingLeft: responsiveScreenWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputStyle: {
    borderBottomWidth: 3,
    height: responsiveScreenHeight(5),
    width: responsiveScreenWidth(65),
    marginTop: responsiveScreenHeight(2),
    fontSize: 15,
  },
  userProfile: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(13),
    borderRadius: 50,
  },
  addGroup: {
    width: responsiveScreenWidth(10),
    marginRight: responsiveScreenWidth(2),
    marginTop: responsiveScreenHeight(1),
  },
  GroupImageView: {
    height: responsiveScreenHeight(9),
    width: responsiveScreenWidth(20),
    borderRadius: 50,
    marginRight: responsiveScreenWidth(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF0F1',
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

export default Creategroup;
