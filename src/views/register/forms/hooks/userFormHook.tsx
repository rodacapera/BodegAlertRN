import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {userFakeData} from '@src/globals/constants/fakeData';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {
  getShopQuery,
  getUserQuery,
  updateUserQuery
} from '@src/reactQuery/userQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {ResultLocations} from '@src/types/locationTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {DataKey, Shop, User} from '@src/types/userTypes';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';

const userFormHook = (qr?: boolean, shopId?: string) => {
  const os = Platform.OS;
  const userData = getUserQuery();
  const shopData = getShopQuery();
  const {colors, dark} = actualTheme();
  const navigation = useNavigation<StackNavigation>();
  const [user, setUser] = useState<User>();
  const [shop, setShop] = useState<Shop>();
  const {isLoading, isSuccess, error, mutate, data} = updateUserQuery();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);
  const [tokenPush, setTokenPush] = useState<string>();
  const [myCurrentLocation, setMyCurrentLocation] = useState<ResultLocations>();

  const getDevice = async () => {
    const device = await AsyncStorage.getItem('@fcmToken');
    device && setTokenPush(device);
  };

  const handleEditUser = () => {
    if (qr && tokenPush) {
      const userClone = {...user};
      userClone.address = shop?.address;
      userClone.administrator = false;
      userClone.alias = shop?.alias;
      userClone.avatar = '';
      userClone.city = shop?.city;
      userClone.countryCode = shop?.countryCode;
      userClone.created = Date.now().toString();
      userClone.date = Date.now().toString();
      userClone.departament = shop?.department;
      userClone.devices = [{device: tokenPush, os}];
      userClone.location = shop?.location;
      userClone.shop = `shops/${shopId}`;
      userClone.type = 'tienda';
      userClone.zipcode = parseInt(shop?.zipcode!);
      navigation.navigate('Login', {qr, data: userClone as User});
    } else {
      user && mutate(user);
    }
  };

  const handleOnchangeInput = (text: never, key: DataKey) => {
    if (user) {
      const userClone = {...user};
      userClone[key] = text;
      setUser(userClone);
    } else {
      const newCurrentUser = {...userFakeData};
      newCurrentUser[key] = text;
      setUser(newCurrentUser);
    }
  };

  useEffect(() => {
    getDevice();
    if (currentButtonAction && shop) {
      const newCurrentUser = user ? {...user} : {...userFakeData};
      newCurrentUser.phone = currentButtonAction.phone;
      newCurrentUser.countryCode = shop.countryCode;
      setUser(newCurrentUser);
    }
  }, [currentButtonAction, shop]);

  useEffect(() => {
    data && setUser(data);
  }, [data]);

  useEffect(() => {
    !data && !qr && userData.data && setUser(userData.data.user);
  }, [userData.data, data]);

  useEffect(() => {
    !shop && shopData.data && setShop(shopData.data as unknown as Shop);
  }, [shopData]);

  useEffect(() => {
    user &&
      headerShown({
        navigation,
        visible: qr ? false : true,
        transparent: false,
        titleColor: dark ? colors.onSurface : colors.onPrimaryContainer
      });
  }, [dark, user, qr]);

  return {
    user,
    setCurrentButtonAction,
    handleOnchangeInput,
    handleEditUser,
    isLoading,
    error,
    shop
  };
};
export {userFormHook};
