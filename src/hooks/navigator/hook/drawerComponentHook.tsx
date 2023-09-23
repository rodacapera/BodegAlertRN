import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {DrawerActions, StackActions} from '@react-navigation/native';
import {StackNavigation} from '@src/types/globalTypes';

const drawerComponentHook = (navigation: StackNavigation) => {
  const handleLogout = () => {
    auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.multiRemove(['@otp', '@userAuth']);
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.dispatch(StackActions.replace('Login'));
      })
      .catch(async error => {
        console.log(error);
        // console.log('locals', await AsyncStorage.getAllKeys());
        // await AsyncStorage.clear();
        // navigation.dispatch(DrawerActions.closeDrawer());
        // navigation.dispatch(StackActions.replace('Login'));
      });
  };
  return {handleLogout};
};

export {drawerComponentHook};
