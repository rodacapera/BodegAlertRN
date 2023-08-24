import AsyncStorage from '@react-native-async-storage/async-storage';
import {GrantedProps} from '@src/types/onboardingTypes';
import {Platform} from 'react-native';
import {
  getLocationPermissions,
  requestLocationPermission,
} from '../locations/permissionsHook';

const grantedAndroid = async (
  setVisible: (e: boolean) => void,
  navigate: any,
) => {
  const granted = await requestLocationPermission();
  isGranted(granted, setVisible, navigate);
};

const grantedIos = async (setVisible: (e: boolean) => void, navigate: any) => {
  const granted = (await getLocationPermissions()) as GrantedProps;
  const isGrantedValid = granted.code ? false : true;
  isGranted(isGrantedValid, setVisible, navigate);
};

const isGranted = async (
  granted: boolean,
  setVisible: (e: boolean) => void,
  navigate: any,
) => {
  if (granted) {
    await AsyncStorage.setItem('@appInit', 'true');
    navigate('LoginSplash');
  } else {
    setVisible(true);
  }
};

const handleFinishOnboarding = async (
  setVisible: (e: boolean) => void,
  navigate: any,
) => {
  if (Platform.OS === 'android') {
    grantedAndroid(setVisible, navigate);
  } else {
    grantedIos(setVisible, navigate);
  }
};

export {handleFinishOnboarding};
