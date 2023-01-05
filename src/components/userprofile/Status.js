import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {hp, ImageConst, wp} from '../../utils/helper/index';
import moment from 'moment';

const Status = ({onPress, item}) => {
  console.log('Status Component ::', item);
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <TouchableOpacity onPress={onPress}>
          <Image source={ImageConst.arrow_png} style={styles.backArro} />
        </TouchableOpacity>
        <Image
          source={{uri: item?.currenuserPhoto}}
          style={styles.currenuserPhoto}
        />
        <View>
          <Text>{item?.userName}</Text>
          <Text>{moment(item?.createdAt).format('DD MMM YYYY')}</Text>
        </View>
      </View>
      <Image source={{uri: item?.status}} style={styles.statusStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  backArro: {
    height: hp(3),
    width: wp(6),
  },
  statusStyle: {
    height: hp(70),
    width: wp(100),
  },
  currenuserPhoto: {
    height: hp(4),
    width: wp(10),
    borderRadius: 15,
  },
});
export default Status;
