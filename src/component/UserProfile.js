import React, {useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {ImageConst} from '../utils/helper/ImageConst';
import Groupmember from './Groupmember';

const Userprofile = props => {
  const {items, onPress, Group} = props;
  const group = Group?.data;
  const total = group?.GroupData;
  const arr = typeof total === 'object' && Object.entries(total);
  console.log('arr==>', arr);
  console.log('total :: ', total);
  console.log('group :: ', group);
  console.log('items :: ', items);

  const [showComponent, setShowComponent] = useState(false);
  const [userDetail, setUserDetail] = useState('');

  const onItemPress = item => {
    setUserDetail(item);
    setShowComponent(!showComponent);
  };

  return (
    <View style={{flex: 1}}>
      {showComponent === false && (
        <View style={{flex:1}}>
          <TouchableOpacity
            onPress={onPress}
            style={{marginTop: responsiveScreenHeight(5)}}>
            <Image source={ImageConst.arrow_png} style={style.headerImage} />
          </TouchableOpacity>
          {group ? (
            <View style={{flex: 1}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={{uri: group?.Photo}}
                  style={{
                    height: responsiveScreenHeight(20),
                    width: responsiveScreenWidth(45),
                    borderRadius: 100,
                  }}
                />
                <Text style={{fontSize: 20, marginTop: 10}}>
                  {group?.GroupChat}
                </Text>
                <Text style={{fontSize: 20, marginTop: 10}}>
                  Group : {arr?.length} Participants
                </Text>
              </View>
              <FlatList
                ListHeaderComponent={() => {
                  return (
                    <View>
                      <Text style={{fontSize: 18, padding: 15}}>
                        {arr?.length} Participants
                      </Text>
                    </View>
                  );
                }}
                data={arr}
                renderItem={({item}) => {
                  console.log('item', item);
                  return (
                    <View>
                      <TouchableOpacity
                        style={style.messageListStyle}
                        onPress={() => onItemPress(item)}>
                        <Image
                          source={{uri: item?.[1]?.Photo}}
                          style={style.userProfile}
                        />
                        <Text style={style.listUserName}>
                          {item?.[1]?.name}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <Image
                source={{uri: items?.Photo}}
                style={{
                  height: responsiveScreenHeight(20),
                  width: responsiveScreenWidth(45),
                  borderRadius: 100,
                }}
              />
              <Text style={{fontSize: 20, marginTop: 10}}>{items?.name}</Text>
            </View>
          )}
        </View>
      )}
      {showComponent && <Groupmember onPress={onItemPress} userDetail={userDetail} group={group}/>}
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
  userProfile: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(13),
    borderRadius: 50,
  },
  messageListStyle: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  listUserName: {
    fontSize: 20,
    marginLeft: 30,
    marginTop: 3,
  },
});

export default Userprofile;
