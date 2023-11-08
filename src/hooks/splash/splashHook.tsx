import {SplashProps} from '@src/types/globalTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const splashHook = async ({navigation}: SplashProps) => {
  const user = await AsyncStorage.getItem('@userAuth');
  const appInit = await AsyncStorage.getItem('@appInit');

  if (appInit !== null) {
    if (user) {
      navigation.replace('Home', {isLogin: false, isBack: true});
    } else {
      navigation.replace('LoginSplash');
    }
  } else {
    navigation.replace('MyOnboarding');
  }
};

export default splashHook;
