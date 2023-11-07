import AsyncStorage, {
  useAsyncStorage
} from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {DrawerActions, StackActions} from '@react-navigation/native';
import {avatar, avatarw} from '@src/assets/images';
import {useGetUser} from '@src/hooks/user/useGetUser';
import {
  setCompanyImagesQuery,
  setShopQuery,
  setUserQuery
} from '@src/reactQuery/userQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {Logos} from '@src/types/imageTypes';
import {useEffect, useState} from 'react';
import {Appearance} from 'react-native';

const drawerComponentHook = (navigation: StackNavigation) => {
  setUserQuery();
  const {getItem} = useAsyncStorage('@theme'); //get global dark mode
  const {colors, theme, setDarkTheme, setLightTheme, dark} = actualTheme();

  const {user, counterEmployees, counterButtons, isLoading, configuration} =
    useGetUser();

  const [isDark, setIsDark] = useState(false);
  const [logos, setLogos] = useState<Logos[]>([]);
  const [shopId, setShopId] = useState<string | undefined>(undefined);

  const setImages = setCompanyImagesQuery();
  setShopQuery(shopId);

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
        navigation.dispatch(StackActions.replace('LoginSplash'));
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

  const handleDynamicLink = (link: {url: string}) => {
    setShopId(undefined);
    // Handle dynamic link inside your own application
    if (link.url.includes('?')) {
      const params = link.url.split('?')[1].split('&');
      const viewParam = params[0].split('=');
      const shopParam = params[1].split('=');
      const view = viewParam[0] == 'view' ? viewParam[1] : undefined;
      const id_shop = shopParam[0] == 'id_shop' ? shopParam[1] : undefined;
      setShopId(id_shop);
    }
  };

  const imageAvatar =
    user && user?.avatar
      ? {
          uri: user?.avatar
        }
      : dark
      ? avatar
      : avatarw;

  useEffect(() => {
    setImages.data && setLogos(setImages.data as Logos[]);
  }, [setImages]);

  useEffect(() => {
    validateSwitch();
    // const listener = Appearance.addChangeListener(() => {
    //   validateSwitch();
    // });
    // return () => listener.remove();
  }, []);

  useEffect(() => {
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user && shopId) {
      navigation.navigate('Register', {
        administrator: false,
        qr: true,
        shopId: shopId
      });
    } else {
      console.debug('user is logged or app was not open');
    }
  }, [shopId]);

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
    imageAvatar,
    configuration
  };
};

export {drawerComponentHook};
