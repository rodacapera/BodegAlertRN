import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {BackHandler} from 'react-native';

const backAction = (
  navigation: NativeStackNavigationProp<ParamListBase, string>,
) => {
  if (navigation.getState().index === 1) {
    BackHandler.exitApp();
    return true;
  } else {
    return false;
  }
  //   return false;
};

export {backAction};
