import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Alert} from 'react-native';
import ZegoUIKitSignalingPlugin from '@zegocloud/zego-uikit-signaling-plugin-rn';
import App from '../../App';
import {
  GROUP_VIDEO_CALL_CONFIG,
  GROUP_VOICE_CALL_CONFIG,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
  ZegoInvitationType,
  ZegoUIKitPrebuiltCallWithInvitation,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';

const Voicecallscreen = ({route}) => {
  const navigation = useNavigation();

  const detail = route?.params?.items;
  console.log('detail=>', detail);

  const groupId = route?.params?.groupId;
  const currentUser = route?.params?.currentuser;

  console.log('groupId==>', groupId);
  console.log('currentUser===>', currentUser);

  // const VoiceCallId =
  //   detail?.sendTo > detail?.sendFrom
  //     ? detail?.sendTo + detail?.sendFrom + '123'
  //     : detail?.sendFrom + detail?.sendTo + '123';

  const userID = String(Math.floor(Math.random() * 10000));
  const userName = `user_${userID}`;
  return (
    <ZegoUIKitPrebuiltCallWithInvitation
      appID={714082125}
      appSign="6465c22dbca6bd082f4119c18d85c63587a464a2a3b72ef3525323ff3e8a9d8f"
      userID={userID}
      userName={userName}
      ringtoneConfig={{
        incomingCallFileName: 'zego_incoming.mp3',
        outgoingCallFileName: 'zego_outgoing.mp3',
      }}
      requireConfig={data => {
        console.warn('requireConfig', data);
        const config =
          data.invitees.length > 1
            ? ZegoInvitationType.videoCall === data.type
              ? GROUP_VIDEO_CALL_CONFIG
              : GROUP_VOICE_CALL_CONFIG
            : ZegoInvitationType.videoCall === data.type
            ? ONE_ON_ONE_VIDEO_CALL_CONFIG
            : ONE_ON_ONE_VOICE_CALL_CONFIG;
        return {
          ...config,
          onHangUp: () => {
            navigation.navigate('Tabnavigate');
          },
          onOnlySelfInRoom: () => {
            navigation.navigate('Tabnavigate');
          },
          onHangUpConfirmation: () => {
            return new Promise((resolve, reject) => {
              Alert.alert('Leave the call', 'Are your sure to leave the call', [
                {
                  text: 'Cancel',
                  onPress: () => {
                    reject();
                  },
                  style: 'cancel',
                },
                {
                  text: 'Confirm',
                  onPress: () => {
                    resolve();
                  },
                },
              ]);
            });
          },
        };
      }}
      plugins={[ZegoUIKitSignalingPlugin]}>
      <App />
    </ZegoUIKitPrebuiltCallWithInvitation>
    // <View style={styles.container}>
    //   <ZegoUIKitPrebuiltCallWithInvitation
    //     appID={714082125}
    //     appSign={
    //       '6465c22dbca6bd082f4119c18d85c63587a464a2a3b72ef3525323ff3e8a9d8f'
    //     }
    //     userID={userID}
    //     userName={userName}
    //     ringtoneConfig={{
    //       incomingCallFileName: 'zego_incoming.mp3',
    //       outgoingCallFileName: 'zego_outgoing.mp3',
    //     }}
    //     requireConfig={data => {
    //       console.warn('requireConfig', data);
    //       const config =
    //         data.invitees.length > 1
    //           ? ZegoInvitationType.videoCall === data.type
    //             ? GROUP_VIDEO_CALL_CONFIG
    //             : GROUP_VOICE_CALL_CONFIG
    //           : ZegoInvitationType.videoCall === data.type
    //           ? ONE_ON_ONE_VIDEO_CALL_CONFIG
    //           : ONE_ON_ONE_VOICE_CALL_CONFIG;
    //       return {
    //         ...config,
    //         onHangUp: () => {
    //           navigation.navigate('Tabnavigate');
    //         },
    //         onOnlySelfInRoom: () => {
    //           navigation.navigate('Tabnavigate');
    //         },
    //         onHangUpConfirmation: () => {
    //           return new Promise((resolve, reject) => {
    //             Alert.alert(
    //               'Leave the call',
    //               'Are your sure to leave the call',
    //               [
    //                 {
    //                   text: 'Cancel',
    //                   onPress: () => {
    //                     reject();
    //                   },
    //                   style: 'cancel',
    //                 },
    //                 {
    //                   text: 'Confirm',
    //                   onPress: () => {
    //                     resolve();
    //                   },
    //                 },
    //               ],
    //             );
    //           });
    //         },
    //       };
    //     }}
    //     plugins={[ZegoUIKitSignalingPlugin]}>
    //     <App />
    //   </ZegoUIKitPrebuiltCallWithInvitation>
    /* {detail ? (
        // <ZegoUIKitPrebuiltCall
        //   appID={714082125}
        //   appSign={
        //     '6465c22dbca6bd082f4119c18d85c63587a464a2a3b72ef3525323ff3e8a9d8f'
        //   }
        //   userID={detail?.sendFrom}
        //   userName={detail?.name}
        //   callID={VoiceCallId}
        // config={{
        //   ...ONE_ON_ONE_VOICE_CALL_CONFIG,
        //   onOnlySelfInRoom: () => {
        // navigation.navigate('Tabnavigate');
        //   },
        //   onHangUp: () => {
        //     navigation.navigate('Tabnavigate');
        //   },
        // }}
        // />
      ) : (
        <ZegoUIKitPrebuiltCall
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
      )} */
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Voicecallscreen;
