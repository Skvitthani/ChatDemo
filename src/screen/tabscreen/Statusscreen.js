import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {hp, ImageConst, Stringconst, wp} from '../../utils/helper/index';
import ImageCropPicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';
import {Button} from '../../components/Index';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const Statusscreen = () => {
  const [openModel, setopenModel] = useState(false);
  const [userUID, setUserUID] = useState('');
  // const [imageURL, setImageURL] = useState('');

  const onAuthStateChanged = user => {
    if (user) {
      console.log('user', user?._user?.uid);
      const userId = user?._user?.uid;
      setUserUID(userId);
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const onImageSlectPress = () => {
    ImageCropPicker.openPicker({
      width: wp(25),
      height: hp(17),
      cropping: true,
    }).then(async image => {
      let imageData = {
        image: image.path,
      };
      uploadImage(imageData);
      onCloseModelPress();
    });
  };

  const uploadImage = async imageData => {
    const imagePath = imageData?.image;
    const reference = storage().ref(`${imagePath}`);
    const pathToFile = `${imagePath}`;
    await reference.putFile(pathToFile);
    getUrl(reference?.path);
  };

  const getUrl = async reference => {
    const imageURL = await storage()
      .ref(reference)
      .getDownloadURL()
      .then(url => {
        return url;
      });
    console.log('imageUrl ::', imageURL);
    // setImageURL(imageURL);
    uploadStatus(imageURL);
  };

  const uploadStatus = (imageURL) => {
    firestore().collection('status').doc(userUID).set({
      status: imageURL,
    });
  };

  const onCloseModelPress = () => {
    setopenModel(false);
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
            onPress={onCloseModelPress}
          />
        </View>
      </Modal>
      <View>
        <TouchableOpacity
          style={style.uploadStatus}
          onPress={() => setopenModel(true)}>
          <View style={style.GroupImageView}>
            <Image source={ImageConst.user_png} style={style.user_png} />
          </View>
          <View style={style.textView}>
            <Text style={style.myStatus}>{Stringconst.mySatuts}</Text>
            <Text>{Stringconst.taptoupload}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  GroupImageView: {
    height: hp(7),
    width: wp(15.5),
    borderRadius: 50,
    marginRight: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D2D6D3',
  },
  user_png: {
    height: hp(3.5),
    width: wp(7),
    marginBottom: wp(1),
    tintColor: 'white',
  },
  uploadStatus: {
    flexDirection: 'row',
    padding: 10,
  },
  textView: {
    paddingVertical: 6,
  },
  myStatus: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  modelView: {
    backgroundColor: '#E5E5E5',
    alignSelf: 'center',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    width: wp(100),
    height: hp(20),
    position: 'absolute',
    bottom: hp(-2),
  },
  buttonView: {
    borderWidth: 0,
    backgroundColor: '#F42C7E',
    marginTop: hp(3),
    borderRadius: 10,
    marginHorizontal: wp(10),
    width: wp(78),
  },
});

export default Statusscreen;
