import AsyncStorage, {
  useAsyncStorage
} from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import {DrawerActions, StackActions} from '@react-navigation/native';
import {avatar} from '@src/assets/images';
import {useGetUser} from '@src/hooks/user/useGetUser';
import {
  getCompanyImagesQuery,
  setCompanyImagesQuery,
  setUserQuery
} from '@src/reactQuery/userQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {Logos} from '@src/types/imageTypes';
import {useEffect, useState} from 'react';
import {Appearance} from 'react-native';

const drawerComponentHook = (navigation: StackNavigation) => {
  setUserQuery();
  setCompanyImagesQuery();
  // const isDrawerOpened = useDrawerStatus();
  const {colors, theme} = actualTheme();
  const {getItem} = useAsyncStorage('@theme');
  const {setDarkTheme, setLightTheme, dark} = actualTheme();
  const {data} = getCompanyImagesQuery();
  const {user, counterEmployees, counterButtons, isLoading} = useGetUser();
  const images = data ?? null;
  const [isDark, setIsDark] = useState(false);
  const [logos, setLogos] = useState<Logos[]>([]);

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

  const imageAvatar = user?.avatar
    ? {
        uri: user?.avatar
      }
    : avatar;

  useEffect(() => {
    images && setLogos(images as Logos[]);
  }, [images]);

  useEffect(() => {
    validateSwitch();
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
    counterButtons,
    isLoading,
    imageAvatar
  };
};

export {drawerComponentHook};
