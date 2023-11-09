import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {userFakeData} from '@src/globals/constants/fakeData';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {geUserByPhoneNumberFirebase} from '@src/hooks/firebase/user/user';
import {HeaderShown} from '@src/hooks/navigator/HeaderShown';
import {
  GetShopQuery,
  GetUserQuery,
  UpdateUserQuery
} from '@src/reactQuery/UserQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {DataKey, Shop, User} from '@src/types/userTypes';
import {useEffect, useState} from 'react';
import {Platform, useColorScheme, useWindowDimensions} from 'react-native';

const UserFormHook = (qr?: boolean, shopId?: string) => {
  const navigation = useNavigation<StackNavigation>();

  const {width} = useWindowDimensions();
  const {colors, dark} = actualTheme();
  const colorScheme = useColorScheme();
  const os = Platform.OS;

  const userData = GetUserQuery();
  const shopData = GetShopQuery();

  const {isLoading, error, mutate, data} = UpdateUserQuery();

  const [user, setUser] = useState<User>();
  const [shop, setShop] = useState<Shop>();
  const [alertUserExist, setAlertUserExist] = useState(false);
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);
  const [tokenPush, setTokenPush] = useState<string>();

  const getDevice = async () => {
    const device = await AsyncStorage.getItem('@fcmToken');
    device && setTokenPush(device);
  };

  const handleEditUser = () => {
    if (qr && tokenPush) {
      const userExist = geUserByPhoneNumberFirebase(user?.phone!);
      userExist.then(querySnapshot => {
        if (querySnapshot.empty) {
          const userClone = {...user};
          userClone.address = shop?.address;
          userClone.administrator = false;
          userClone.alias = shop?.alias;
          userClone.avatar = '';
          userClone.city = shop?.city;
          userClone.prefix = currentButtonAction.prefix;
          userClone.countryCode = shop?.countryCode;
          userClone.created = Date.now().toString();
          userClone.date = Date.now().toString();
          userClone.departament = shop?.department;
          userClone.devices = [{device: tokenPush, os}];
          userClone.location = shop?.location;
          userClone.shop = `shops/${shopId}`;
          userClone.type = 'residence';
          userClone.zipcode = shop?.zipcode;
          userClone.pay = true;
          userClone.group_name = shop?.group_name;
          userClone.group_number = shop?.group_number;
          navigation.push('Login', {qr, data: userClone as User});
        } else {
          setAlertUserExist(true);
        }
      });
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
      HeaderShown({
        navigation,
        width: !qr ? width : undefined,
        visible: qr ? false : true,
        transparent: false,
        titleColor:
          Platform.OS == 'android'
            ? colorScheme === 'dark'
              ? '#a23234'
              : dark
              ? colors.onSurface
              : colors.onPrimaryContainer
            : colors.onPrimaryContainer
      });
  }, [
    navigation,
    dark,
    user,
    qr,
    width,
    colorScheme,
    colors.onSurface,
    colors.onPrimaryContainer
  ]);

  // useEffect(() => {
  //   const getUSer = async (user: User) => {
  //     const userN = (await getUserFirebase(user.user_uid)) as User;
  //     console.log('userFound', userN.prefix);

  //     const newUserData = {
  //       uid: userN.user_uid,
  //       user: userN
  //     } as unknown as SetUserAuthParams;
  //     console.log('newUserData', newUserData.user);

  //     await AsyncStorage.setItem('@userAuth', JSON.stringify(newUserData));
  //     setUser(newUserData.user);
  //   };
  //   user && getUSer(user);
  // }, [user]);

  return {
    user,
    setCurrentButtonAction,
    handleOnchangeInput,
    handleEditUser,
    isLoading,
    error,
    shop,
    alertUserExist,
    setAlertUserExist,
    currentButtonAction
  };
};
export {UserFormHook};
