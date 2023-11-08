import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigation} from '@src/types/globalTypes';

const SplashHook = async ({navigator}: {navigator: StackNavigation}) => {
  const user = await AsyncStorage.getItem('@userAuth');
  const appInit = await AsyncStorage.getItem('@appInit');

  if (appInit !== null) {
    if (user) {
      navigator.replace('Home', {isLogin: false, isBack: true});
    } else {
      navigator.replace('LoginSplash');
    }
  } else {
    navigator.replace('MyOnboarding');
  }
};

export default SplashHook;
