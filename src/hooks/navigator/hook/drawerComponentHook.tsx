import AsyncStorage, {
  useAsyncStorage
} from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {useDrawerStatus} from '@react-navigation/drawer';
import {DrawerActions, StackActions} from '@react-navigation/native';
import {useGetUser} from '@src/hooks/user/useGetUser';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {Logos} from '@src/types/imageTypes';
import {useEffect, useState} from 'react';
import {Appearance} from 'react-native';

const drawerComponentHook = (navigation: StackNavigation) => {
  const {colors, theme} = actualTheme();
  const isDrawerOpened = useDrawerStatus();
  const {user, counterEmployees, images, buttons, counterButtons} =
    isDrawerOpened && useGetUser();
  const {getItem} = useAsyncStorage('@theme');
  const {setDarkTheme, setLightTheme, dark} = actualTheme();
  const [isDark, setIsDark] = useState(false);
  const [logos, setLogos] = useState<Logos>([]);

  const onToggleSwitch = () => {
    setIsDark(!isDark);
    !isDark ? setDarkTheme() : setLightTheme();
  };

  const handleLogout = () => {
    auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.multiRemove(['@otp', '@userAuth']);
        navigation.dispatch(DrawerActions.closeDrawer());
        navigation.dispatch(StackActions.replace('Login'));
      })
      .catch(async error => {
        console.debug(error);
      });
  };

  const validateSwitch = async () => {
    const item = await getItem();
    if (dark) {
      setIsDark(true);
      Appearance.addChangeListener(() => console.debug('remove')).remove();
    } else {
      item ? setIsDark(item === 'dark' ? true : false) : setIsDark(true);
    }
    item
      ? setIsDark(item === 'dark' ? true : false)
      : setIsDark(dark ? true : false);
  };

  useEffect(() => {
    images && setLogos(images);
  }, [images]);

  useEffect(() => {
    validateSwitch();
  }, []);

  useEffect(() => {
    Appearance.addChangeListener(() => {
      validateSwitch();
    });
    return () => {
      Appearance.addChangeListener(() => console.debug('remove')).remove();
    };
  }, []);

  return {
    handleLogout,
    onToggleSwitch,
    setIsDark,
    isDark,
    colors,
    theme,
    user,
    logos,
    counterEmployees,
    buttons,
    counterButtons
  };
};

export {drawerComponentHook};
