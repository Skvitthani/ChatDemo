import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Chatescreen from '../screen/Chatescreen';
import Signupscreen from '../screen/Signupscreen';
import {navigationRef} from './NavigateRef';
import Settingscreen from '../screen/Settingscreen';
import Groupscreen from '../screen/Groupscreen';
import Creategroup from '../screen/Creategroup';
import Tabnavigate from './Tabnavigate';
import Userlistscreen from '../screen/Userlistscreen';
import Notificationscreen from '../screen/Notificationscreen';
import Voicecallscreen from '../screen/Voicecallscreen';
import Videocallscreen from '../screen/Videocallscreen';

const stack = createNativeStackNavigator();

const Navigate = () => {
  return (
    <NavigationContainer ref={navigationRef} independent={true}>
      <stack.Navigator 
      >
        <stack.Screen
          name="Tabnavigate"
          component={Tabnavigate}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Signupscreen"
          component={Signupscreen}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Chatescreen"
          component={Chatescreen}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Groupscreen"
          component={Groupscreen}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Creategroup"
          component={Creategroup}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Settingscreen"
          component={Settingscreen}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Userlistscreen"
          component={Userlistscreen}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Notificationscreen"
          component={Notificationscreen}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Voicecallscreen"
          component={Voicecallscreen}
          options={{headerShown: false}}
        />
        <stack.Screen
          name="Videocallscreen"
          component={Videocallscreen}
          options={{headerShown: false}}
        />
      </stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigate;
