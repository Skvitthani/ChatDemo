import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import { ImageConst } from '../utils/helper/ImageConst';
import Button from './Button';
import InputText from './InputText';

const LoginComponent = ({
  onGoogleButtonPress,
  onFacebookIosButtonPress,
  onFacebookButtonPress,
  Pass,
  userName,
  onSignInPress
}) => {
  return (
    <View>
      <Text style={style.loginFont}>Welcome Back!</Text>
      <View style={style.inputStyle}>
        <Image
          source={ImageConst.email_png}
          style={style.imageStyle}
        />
        <InputText
          placeholder={'Email'}
          containerStyle={style.inputTextStyle}
          onChangeText={userName}
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
          secureTextEntry={true}
          onChangeText={Pass}
        />
      </View>
      <Button
      onPress={onSignInPress}
        constButtonStyle={style.loginButton}
        text={'Sign In'}
        containFontStyle={{color: 'white'}}
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
          onPress={onGoogleButtonPress}
          text={'Google'}
          source={ImageConst.google_png}
          IamgeStyle={{height: 20, width: 20}}
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
  loginFont: {
    fontSize: 35,
    alignSelf: 'center',
    color: '#2B2D5E',
    marginVertical: 20,
  },
  inputStyle: {
    flexDirection: 'row',
    borderWidth: 1,
    height: responsiveScreenHeight(5),
    marginHorizontal: responsiveScreenWidth(5),
    borderRadius: 15,
    marginVertical: 15,
  },
  inputTextStyle: {
    width: responsiveScreenWidth(80),
    marginHorizontal: responsiveScreenWidth(0),
    borderWidth: 0,
  },
  imageStyle: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginLeft: 5,
    tintColor: '#2B2D5E',
  },
  loginButton: {
    height: responsiveScreenHeight(6),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: responsiveScreenHeight(3),
    backgroundColor: '#2B2D5E',
    width: responsiveScreenWidth(70),
    alignSelf: 'center',
  },
  borderStyle: {
    borderTopWidth: 1,
    width: 100,
    alignSelf: 'center',
  },
});

export default LoginComponent;
