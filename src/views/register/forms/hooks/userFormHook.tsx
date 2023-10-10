import {useNavigation} from '@react-navigation/native';
import {userFakeData} from '@src/globals/constants/fakeData';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {
  getShopQuery,
  getUserQuery,
  setUserQuery,
  updateUserQuery
} from '@src/reactQuery/userQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {DataKey, Shop, User} from '@src/types/userTypes';
import {useEffect, useState} from 'react';

const userFormHook = () => {
  const userData = getUserQuery();
  const shopData = getShopQuery();
  const {colors, dark} = actualTheme();
  const navigation = useNavigation<StackNavigation>();
  const [user, setUser] = useState<User>();
  const [shop, setShop] = useState<Shop>();
  const {isLoading, isSuccess, error, mutate, data} = updateUserQuery();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  const handleEditUser = () => {
    console.log('send data user', user);
    user && mutate(user);
  };

  const handleOnchangeInput = (text: never, key: DataKey) => {
    if (user) {
      const userClone = {...user};
      userClone[key] = text;
      setUser(userClone);
    } else {
      const newCurrentUser = userFakeData;
      newCurrentUser.phone = currentButtonAction.phone;
      newCurrentUser[key] = text;
      setUser(newCurrentUser);
    }
  };

  useEffect(() => {
    console.log('current', currentButtonAction);
    if (currentButtonAction && shop) {
      const newCurrentUser = user ? {...user} : {...userFakeData};
      newCurrentUser.phone = currentButtonAction.phone;
      newCurrentUser.countryCode = shop.countryCode;
      console.log('setttt', newCurrentUser.phone);
      setUser(newCurrentUser);
    }
  }, [currentButtonAction, shop]);

  useEffect(() => {
    isSuccess && setUser(data);
  }, [isSuccess, isLoading, error]);

  useEffect(() => {
    !data && userData.data && setUser(userData.data.user);
  }, [userData.data, data]);

  useEffect(() => {
    !shop && shopData.data && setShop(shopData.data as unknown as Shop);
  }, [shopData]);

  //   useEffect(() => {
  //     user && (user.phone = currentButtonAction.phone);
  //   }, [currentButtonAction]);

  useEffect(() => {
    user &&
      headerShown({
        navigation,
        visible: true,
        transparent: false,
        titleColor: dark ? colors.onSurface : colors.onPrimaryContainer
      });
  }, [dark, user]);

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
