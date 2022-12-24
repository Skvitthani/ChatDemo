import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {ImageConst} from '../utils/helper/ImageConst';

const Groupmember = props => {
  const {onPress, userDetail, group} = props;
  console.log('userDetail', userDetail);
  console.log('group', group);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity
        onPress={onPress}
        style={{marginTop: responsiveScreenHeight(5)}}>
        <Image source={ImageConst.arrow_png} style={style.headerImage} />
      </TouchableOpacity>
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri: userDetail[1]?.Photo}}
          style={{
            height: responsiveScreenHeight(20),
            width: responsiveScreenWidth(45),
            borderRadius: 100,
          }}
        />
        <Text style={{fontSize: 20, marginTop: 10}}>{userDetail[1]?.name}</Text>
      </View>
      <Text style={style.aboutGroup}>About Group : </Text>
      <View style={style.groupView}>
        <Image source={{uri: group?.Photo}} style={style.groupPhoto} />
        <Text style={style.groupName}>{group?.GroupChat}</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  headerImage: {
    height: 25,
    width: 25,
    marginTop: 5,
    marginLeft: 10,
  },
  aboutGroup: {
    fontSize: 20,
    marginLeft: responsiveScreenWidth(1),
  },
  groupPhoto: {
    height: responsiveScreenHeight(7),
    width: responsiveScreenWidth(16),
    borderRadius: 30,
  },
  groupView : {
    flexDirection : 'row',
    padding : 5
  },
  groupName : {
    fontSize : 20,
    marginLeft :responsiveScreenWidth(3),
    marginTop : responsiveScreenHeight(1.58)
  }
});

export default Groupmember;
