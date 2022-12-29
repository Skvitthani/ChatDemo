import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Alert, View} from 'react-native';
import ZegoUIKitPrebuiltCall, {
  GROUP_VOICE_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Voicecallscreen = ({route}) => {
  const navigation = useNavigation();

  const Sender = route?.params?.Sender;
  console.log('Sender==>', Sender);

  const detail = route?.params?.items;
  console.log('detail=>', detail);

  // const groupId = route?.params?.groupId;
  // const currentUser = route?.params?.currentuser;

  // console.log('groupId==>', groupId);
  // console.log('currentUser===>', currentUser);

  const VoiceCallId =
    detail?.sendTo > detail?.sendFrom
      ? detail?.sendTo + detail?.sendFrom + '123'
      : detail?.sendFrom + detail?.sendTo + '123';
  console.log('VoiceCallId==>', VoiceCallId);
  return (
    <View style={styles.container}>
      {/* {Users ? ( */}
      <ZegoUIKitPrebuiltCall
        appID={714082125}
        appSign={
          '6465c22dbca6bd082f4119c18d85c63587a464a2a3b72ef3525323ff3e8a9d8f'
        }
        userID={detail?.sendFrom}
        userName={detail?.name}
        callID={VoiceCallId}
        config={{
          ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          onOnlySelfInRoom: () => {
            navigation.navigate('Tabnavigate');
          },
          onHangUp: () => {
            navigation.navigate('Tabnavigate');
          },
        }}
      />
      {/* ) : ( */}
      {/* <ZegoUIKitPrebuiltCall
          appID={714082125}
          appSign={
            '6465c22dbca6bd082f4119c18d85c63587a464a2a3b72ef3525323ff3e8a9d8f'
          }
          userID={currentUser?.userId}
          userName={currentUser?.name}
          callID={groupId}
          config={{
            ...GROUP_VOICE_CALL_CONFIG,
            onOnlySelfInRoom: () => {
              navigation.navigate('Tabnavigate');
            },
            onHangUp: () => {
              navigation.navigate('Tabnavigate');
            },
          }}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Voicecallscreen;
