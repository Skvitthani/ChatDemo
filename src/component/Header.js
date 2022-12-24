import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';

const Header = ({
  signInButton,
  signupButton,
  onSignupPress,
  onSignInPress,
  txt1,
  txt2,
  constHeaderStyle,
}) => {
  return (
    <View style={[style.headerStyle, constHeaderStyle]}>
      <TouchableOpacity
        style={[style.signInButton, signupButton]}
        onPress={onSignupPress}>
        <Text style={{color: 'white', fontSize: 25}}>{txt1}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[style.signInButton, signInButton]}
        onPress={onSignInPress}>
        <Text style={{color: 'white', fontSize: 25}}>{txt2}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  // headerStyle: {
  //   height: responsiveScreenHeight(25),
  //   borderBottomEndRadius: 30,
  //   borderBottomStartRadius: 30,
  //   backgroundColor: '#2B2D5E',
  //   flexDirection: 'row',
  //   alignItems: 'flex-end',
  //   justifyContent: 'space-evenly',
  // },
  signInButton: {
    marginBottom: 3,
  },
});

export default Header;
