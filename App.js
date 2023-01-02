import {useNavigation} from '@react-navigation/native';
import React, {Component, useEffect} from 'react';
import {Alert} from 'react-native';
import {Provider} from 'react-redux';
import {myStore} from './src/action/store/Store';
import Navigate from './src/navigation/Navigate';
import messaging from '@react-native-firebase/messaging';
import {navigate} from './src/navigation/NavigateRef';
import { requestUserPermission } from './src/utils/Permission/IOSPermission';

const App = () => {
  // const navigation = useNavigation();

  useEffect(() => {
    requestUserPermission()
    const unsbscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage=>', remoteMessage);
      if (remoteMessage?.notification?.body == 'Voice Call') {
        Alert.alert(
          'Voice Call',
          `From ${remoteMessage?.notification?.title}`,
          [
            {
              text: 'Reject',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Accept',
              onPress: () =>
                navigate('Voicecallscreen', {
                  CallerId: remoteMessage?.data?.CallId,
                }),
            },
          ],
        );
      } else if (remoteMessage?.notification?.body == 'Video Call') {
        Alert.alert(
          'Video Call',
          `From ${remoteMessage?.notification?.title}`,
          [
            {
              text: 'Reject',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Accept',
              onPress: () =>
                navigate('Videocallscreen', {
                  CallerId: remoteMessage?.data?.CallId,
                }),
            },
          ],
        );
      } else if (remoteMessage?.notification?.body == 'Group Voice Call') {
        Alert.alert(
          'Group Voice Call',
          `From ${remoteMessage?.notification?.title}`,
          [
            {
              text: 'Reject',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Accept',
              onPress: () =>
                navigate('Voicecallscreen', {
                  GroupCallerId: remoteMessage?.data?.CallerId                  ,
                }),
            },
          ],
        );
      } else {
        Alert.alert(
          'Group Video Call',
          `From ${remoteMessage?.notification?.title}`,
          [
            {
              text: 'Reject',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'Accept',
              onPress: () =>
                navigate('Videocallscreen', {
                  GroupCallerId: remoteMessage?.data?.CallerId                  ,
                }),
            },
          ],
        );
      }
    });
    return unsbscribe;
  }, []);

  return (
    <Provider store={myStore}>
      <Navigate />
    </Provider>
  );
};

export default App;
