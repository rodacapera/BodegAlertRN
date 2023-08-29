import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '@src/types/globalTypes';
import MyOnboarding from '@src/components/onboarding/MyOnboarding';
import LoginSplash from '../../views/login/LoginSplash';
import Splash from '../../views/splash/Splash';
import Buttons from '@src/views/buttons/Buttons';
import Employees from '@src/views/employees/Employees';
import Home from '@src/views/home/Home';
import Login from '@src/views/login/Login';
import Profile from '@src/views/profile/Profile';
import Register from '@src/views/register/Register';

type Config = {
  animation: string;
  config: {
    stiffness: number;
    damping: number;
    mass: number;
    overshootClamping: boolean;
    restDisplacementThreshold: number;
    restSpeedThreshold: number;
  };
};

const config: Config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

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
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          // title: 'BodegAlert',
          // headerStyle: {
          //   backgroundColor: backgroundStyle.backgroundColor,
          // },
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Employees"
        component={Employees}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="Buttons"
        component={Buttons}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigationProvider;
