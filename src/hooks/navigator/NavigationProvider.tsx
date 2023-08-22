import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {useColorScheme} from 'react-native';
import {RootStackParamList} from '@src/types/globalTypes';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import MyOnboarding from '@src/components/onboarding/MyOnboarding';
import Splash from '../../views/splash/Splash';
import LoginSplash from '../../views/login/LoginSplash';
import Default from '../../views/default/Default';

import Home from '@src/views/home/Home';
import Login from '@src/views/login/Login';
import Register from '@src/views/register/Register';

const NavigationProvider = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MyOnboarding"
        component={MyOnboarding}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          // title: 'BodegAlert',
          // headerStyle: {
          //   backgroundColor: backgroundStyle.backgroundColor,
          // },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginSplash"
        component={LoginSplash}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigationProvider;
