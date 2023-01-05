import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import moment from 'moment';
import {hp, ImageConst, wp} from '../../utils/helper/index';
import {useNavigation} from '@react-navigation/native';
import * as Progress from 'react-native-progress';
const Statusshowscreen = ({route}) => {
  const Status = route?.params?.Status;
  console.log('Status Component ::', Status);
  const navigation = useNavigation();
  const [listtime, setListTime] = useState(0);

  useEffect(() => {
    const timers = setInterval(() => {
      setListTime(list => list + 1);
      listtime === 10 && navigation.navigate('Tabnavigate');
    }, 1000);

    return () => {
      clearTimeout(timers);
    };
  }, [listtime]);

  console.log('listtime', listtime / 10);
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Progress.Bar
        style={{marginTop: hp(2), marginLeft: wp(1)}}
        color="white"
        width={wp(97)}
        height={hp(0.7)}
        progress={listtime / 10}
      />
      <View style={styles.statusDetali}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabnavigate')}>
          <Image source={ImageConst.arrow_png} style={styles.backArro} />
        </TouchableOpacity>
        <Image
          source={{uri: Status?.currenuserPhoto}}
          style={styles.currenuserPhoto}
        />
        <View>
          <Text style={{color: 'white'}}>{Status?.userName}</Text>
          <Text style={{color: 'white'}}>
            {moment(Status?.createdAt).format('DD MMM YYYY')}
          </Text>
        </View>
      </View>
      <Image source={{uri: Status?.status}} style={styles.statusStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backArro: {
    height: hp(3),
    width: wp(6.5),
    tintColor: 'white',
  },
  statusStyle: {
    height: hp(70),
    width: wp(100),
  },
  currenuserPhoto: {
    height: hp(4.8),
    width: wp(10.5),
    borderRadius: 15,
    marginLeft: wp(5),
    marginRight: wp(5),
  },
  statusDetali: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    marginTop: hp(2),
  },
});
export default Statusshowscreen;
