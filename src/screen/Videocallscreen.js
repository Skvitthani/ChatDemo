import {useNavigation} from '@react-navigation/native';
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import ZegoUIKitPrebuiltCall, {
  GROUP_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {ZegoLayoutMode} from '@zegocloud/zego-uikit-rn';

const Videocallscreen = ({route}) => {
  const detail = route?.params?.items;
  console.log('detail=>', detail);

  const groupId = route?.params?.groupId;
  const currentUser = route?.params?.currentuser;

  console.log('groupId==>', groupId);
  console.log('currentUser===>', currentUser);

  const navigation = useNavigation();

  const VideoCallId =
    detail?.sendTo > detail?.sendFrom
      ? detail?.sendTo + detail?.sendFrom + '123'
      : detail?.sendFrom + detail?.sendTo + '123';

  return (
    <View style={{flex: 1}}>
      {groupId ? (
        <ZegoUIKitPrebuiltCall
          appID={714082125}
          appSign={
            '6465c22dbca6bd082f4119c18d85c63587a464a2a3b72ef3525323ff3e8a9d8f'
          }
          profileUrl={currentUser?.Photo}
          userID={currentUser?.userId}
          userName={currentUser?.name}
          callID={groupId}
          config={{
            ...GROUP_VIDEO_CALL_CONFIG,
            onOnlySelfInRoom: () => {
              navigation.navigate('Tabnavigate');
            },
            onHangUp: () => {
              navigation.navigate('Tabnavigate');
            },
            turnOnCameraWhenJoining: false,
            turnOnMicrophoneWhenJoining: true,
          }}
        />
      ) : (
        <ZegoUIKitPrebuiltCall
          appID={714082125}
          appSign={
            '6465c22dbca6bd082f4119c18d85c63587a464a2a3b72ef3525323ff3e8a9d8f'
          }
          profileUrl={detail?.Photo}
          userID={detail?.sendFrom}
          userName={detail?.name}
          callID={VideoCallId}
          config={{
            ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
            onOnlySelfInRoom: () => {
              navigation.navigate('Tabnavigate');
            },
            onHangUp: () => {
              navigation.navigate('Tabnavigate');
            },
            
            turnOnCameraWhenJoining: false,
            turnOnMicrophoneWhenJoining: true,
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default Videocallscreen;
