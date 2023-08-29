import {NavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, useColorScheme} from 'react-native';
import {$RemoveChildren} from 'react-native-paper/lib/typescript/src/types';

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

export type CustomLinkProps = {
  text: string;
  link: string;
  underline?: boolean;
  color?: string;
};

export type TextWithCustomLinkProps = {text: string; link: string};

export type QrModalProps = {
  visible: boolean;
  setVisible: (e: boolean) => void;
};

export type ButtonsModalProps = {
  visible: boolean;
  setVisible: (e: boolean) => void;
};

export type CustomDialogAlertProps = {
  visible: boolean;
  setVisible: (e: boolean) => void;
  cancelButton?: boolean;
  actionSuccess?: (e: boolean) => void;
  title: string;
  description: string;
};

type Actions = {label: string & $RemoveChildren<typeof Button>}[];
export type CustomBannerProps = {
  actions?: Actions;
  visible: boolean;
  text: string;
  icon: string;
};

type ParamListBase = {
  //example to index
  [x: string]: object | undefined;
};
