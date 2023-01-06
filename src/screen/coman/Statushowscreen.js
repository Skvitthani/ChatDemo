import React, {useState} from 'react';
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
import {ProgressBar} from 'react-native-stories-view';

const Statusshowscreen = ({route}) => {
  const Status = route?.params?.Status;
  console.log('Status Component ::', Status);
  const navigation = useNavigation();
  const [status, setStatus] = useState(0);
  console.log('status==>', status);

  const onChange = () => {
    if (Status?.length - 1 === status) {
      navigation.navigate('Tabnavigate');
    } else {
      setStatus(status + 1);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <ProgressBar
        images={Status}
        onChange={onChange}
        progressIndex={3}
        enableProgress={true}
        duration={5}
        barStyle={{
          barWidth: 100,
          barHeight: 4,
        }}
      />
      <View style={styles.statusDetali}>
        <TouchableOpacity onPress={() => navigation.navigate('Tabnavigate')}>
          <Image source={ImageConst.arrow_png} style={styles.backArro} />
        </TouchableOpacity>
        <Image
          source={{uri: Status?.[status]?.currenuserPhoto}}
          style={styles.currenuserPhoto}
        />
        <View>
          <Text style={{color: 'white'}}>{Status?.[status]?.userName}</Text>
          <Text style={{color: 'white'}}>
            {moment(Status?.[status]?.createdAt).format('DD MMM YYYY')}
          </Text>
        </View>
      </View>
      <Image
        source={{uri: Status?.[status]?.status}}
        style={styles.statusStyle}
      />
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
