import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useColorScheme} from 'react-native';

const colorScheme = useColorScheme();

// export const paperTheme =
//   colorScheme === 'dark'
//     ? {...MD3DarkTheme, colors: darkTheme.colors}
//     : {...MD3LightTheme, colors: lightTheme.colors};

// export type AppTheme = typeof paperTheme;

// export const useAppTheme = () => useTheme<AppTheme>();
export type ShopProps = {
  address: string;
  city: string;
  state: string;
  alias: string;
};
export type RegisterParams = {
  administrator: boolean;
  shop?: ShopProps;
};
export type RootStackParamList = {
  Splash: undefined;
  MyOnboarding: undefined;
  Home: undefined;
  LoginSplash: undefined;
  Login: undefined;
  LoginForm: undefined;
  Register: RegisterParams;
  Profile: RegisterParams;
  Buttons: undefined;
  Employees: undefined;
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
export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ProfileProps = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;
export type ButtonsProps = NativeStackScreenProps<
  RootStackParamList,
  'Buttons'
>;
export type EmployeesProps = NativeStackScreenProps<
  RootStackParamList,
  'Employees'
>;
export type MyOnboardingProps = NativeStackScreenProps<
  RootStackParamList,
  'MyOnboarding'
>;
