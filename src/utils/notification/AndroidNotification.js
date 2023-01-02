// import PushNotification from "react-native-push-notification";
import notifee, {AndroidStyle} from '@notifee/react-native';

const showNotification = async (title, message, image) => {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  console.log('channelId++', channelId);
  notifee.displayNotification({
    title: title,
    body: message,
    android: {
      largeIcon: image,
      channelId,
      actions: [
        {
          title: 'Accept',
          pressAction: {
            id: 'Accept',
          },
        },
        {
          title: 'Reject',
          pressAction: {
            id: 'Reject',
          },
        },
      ],
    },
  });
};

export default {showNotification};
