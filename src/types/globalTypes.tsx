import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {darkTheme} from '@src/hooks/darkMode';
import {lightTheme} from '@src/hooks/lightMode';
import {useColorScheme} from 'react-native';
import {MD3DarkTheme, MD3LightTheme, useTheme} from 'react-native-paper';

const colorScheme = useColorScheme();

export const paperTheme =
  colorScheme === 'dark'
    ? {...MD3DarkTheme, colors: darkTheme.colors}
    : {...MD3LightTheme, colors: lightTheme.colors};

export type AppTheme = typeof paperTheme;

export const useAppTheme = () => useTheme<AppTheme>();

export type RootStackParamList = {
  Splash: undefined;
  MyOnboarding: undefined;
  Home: undefined;
  LoginSplash: undefined;
  Login: undefined;
  LoginForm: undefined;
  Register: {
    administrator: boolean;
    shop?: {address: string; city: string; state: string; alias: string};
  };
};

export type SelectedTypes = 'phone' | 'city';

export type StackNavigation = NavigationProp<RootStackParamList>;
export type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;
export type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;
export type LoginSplashProps = NativeStackScreenProps<
  RootStackParamList,
  'LoginSplash'
>;
export type RegisterProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;
