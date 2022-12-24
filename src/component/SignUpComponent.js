import React, { useState } from 'react';
import {Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { ImageConst } from '../utils/helper/ImageConst';
import Button from './Button';
import InputText from './InputText';

const SignUpComponent = ({
  onImageSlectPress,
  onCloseModelPress,
  visible,
  ProfilePic,
  onOpenModelPress,
  onSignUpPress,
  onFacebookIosButtonPress,
  onFacebookButtonPress,
  onGoogleButtonPress,
  fullname,
  email,
  password
}) => {

  return (
    <View style={style.mainView}>
      <Modal visible={visible} animationType="slide">
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
      <Text style={style.loginFont}>Create Account</Text>
      <View style={style.imageView}>
        <Image
          source={ProfilePic}
          style={{height: 98, width: 100, borderRadius: 50}}
        />
        <TouchableOpacity
          style={style.addPhotoStyle}
          onPress={onOpenModelPress}>
          <Image
            source={ImageConst.plus_png}
            style={{height: 15, width: 15}}
          />
        </TouchableOpacity>
      </View>
      <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 5}}>
        Upload Photo
      </Text>
      <View style={style.inputStyle}>
        <Image
          source={ImageConst.user_png}
          style={style.imageStyle}
        />
        <InputText
          placeholder={'Full Name'}
          containerStyle={style.inputTextStyle}
          onChangeText={fullname}
        />
      </View>
      <View style={style.inputStyle}>
        <Image
          source={ImageConst.email_png}
          style={style.imageStyle}
        />
        <InputText
          placeholder={'Email'}
          containerStyle={style.inputTextStyle}
          onChangeText={email}
          autoCapitalize={'none'}
        />
      </View>
      <View style={style.inputStyle}>
        <Image
          source={ImageConst.padlock_png}
          style={style.imageStyle}
        />
        <InputText
          placeholder={'Password'}
          containerStyle={style.inputTextStyle}
          onChangeText={password}
          secureTextEntry={true}
        />
      </View>
      <Button
        text={'Sign Up'}
        containFontStyle={{color : 'white'}}
        onPress={onSignUpPress}
        constButtonStyle={style.loginButton}
      />
      <View
        style={{flexDirection: 'row', marginTop: 10, justifyContent: 'center'}}>
        <View style={style.borderStyle} />
        <Text style={{marginHorizontal: 10, fontSize: 20}}>
          Or sign Up with
        </Text>
        <View style={style.borderStyle} />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginTop: 20,
        }}>
        <Button
          text={'Google'}
          source={ImageConst.google_png}
          IamgeStyle={{height: 20, width: 20}}
          onPress={onGoogleButtonPress}
        />
        <Button
          text={'Facebook'}
          containFontStyle={{color: 'white'}}
          constButtonStyle={{backgroundColor: '#2B2D5E'}}
          source={ImageConst.facebook_png}
          IamgeStyle={{height: 20, width: 20, tintColor: 'white'}}
          onPress={() => {
            Platform.OS === 'ios'
              ? onFacebookIosButtonPress()
              : onFacebookButtonPress();
          }}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  buttonView: {
    borderWidth: 0,
    backgroundColor: '#F42C7E',
    marginTop: responsiveScreenHeight(3),
    borderRadius: 10,
    marginHorizontal: responsiveScreenWidth(10),
    width: responsiveScreenWidth(78),
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
  loginFont: {
    fontSize: 35,
    alignSelf: 'center',
    color: '#383864',
    marginVertical: 20,
  },
  imageView: {
    height: 100,
    width: 100,
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    alignSelf: 'center',
  },
  addPhotoStyle: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 15,
    height: 20,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  inputStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    height: responsiveScreenHeight(5),
    marginHorizontal: responsiveScreenWidth(5),
    borderRadius: 15,
    marginVertical: 15,
  },
  imageStyle: {
    height: 15,
    width: 15,
    alignSelf: 'center',
    marginLeft: 10,
    tintColor: '#2B2D5E',
  },
  inputTextStyle: {
    width: responsiveScreenWidth(80),
    marginHorizontal: responsiveScreenWidth(0),
    borderWidth: 0,
  },
  loginButton: {
    height: responsiveScreenHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveScreenWidth(80),
    borderRadius: 30,
    marginTop: responsiveScreenHeight(2),
    backgroundColor: '#2B2D5E',
    alignSelf: 'center',
  },
  borderStyle: {
    borderTopWidth: 1,
    width: 100,
    alignSelf: 'center',
  },
});

export default SignUpComponent;
