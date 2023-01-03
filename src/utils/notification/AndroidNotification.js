import notifee from '@notifee/react-native';

const showNotification = async (title, message, image, CallId) => {
  await notifee.requestPermission();
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });
  console.log('channelId++', channelId);
  notifee.displayNotification({
    title: title,
    body: message,
    data: {
      title: CallId,
    },
    android: {
      largeIcon: image,
      channelId,
      actions: [
        {
          title: 'Accept',
          pressAction: {
            id: 'Accept',
            launchActivity: 'default'
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
