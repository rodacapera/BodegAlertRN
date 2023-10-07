import {useNavigation} from '@react-navigation/native';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {useEffect} from 'react';

const profileHook = () => {
  const {colors, dark} = actualTheme();
  const navigation = useNavigation<StackNavigation>();
  return {};
};

export {profileHook};
