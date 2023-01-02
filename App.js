import {useNavigation} from '@react-navigation/native';
import React, {Component, useEffect, useState} from 'react';
import {Alert, AppState} from 'react-native';
import {Provider} from 'react-redux';
import {myStore} from './src/action/store/Store';
import Navigate from './src/navigation/Navigate';
import messaging from '@react-native-firebase/messaging';
import {navigate} from './src/navigation/NavigateRef';
import AndroidNotification from './src/utils/notification/AndroidNotification';

const App = () => {
  const [appState, setAppState] = useState('');

  useEffect(() => {
    const AppStatus = AppState.addEventListener('change', nextAppState => {
      console.log('Next AppState is: ', nextAppState);
      setAppState(nextAppState);
    if (nextAppState === 'active') {
      messaging().onMessage(async remoteMessage => {
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
                    GroupCallerId: remoteMessage?.data?.CallerId,
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
                    GroupCallerId: remoteMessage?.data?.CallerId,
                  }),
              },
            ],
          );
        }
      });
    } else {
      messaging().setBackgroundMessageHandler(async remoteMessage => {
        AndroidNotification.showNotification(
          `${remoteMessage?.notification?.body}`,
          `${remoteMessage?.notification?.title}`,
          `${remoteMessage?.data?.Photo}`,
        );
      });
    }
  });

    return () => {
      AppStatus?.remove();
    };
  }, []);

  return (
    <Provider store={myStore}>
      <Navigate />
    </Provider>
  );
};

export default App;
