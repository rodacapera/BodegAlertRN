import {useNavigation} from '@react-navigation/native';
import {buttonActionInitialState} from '@src/globals/constants/login';
import {headerShown} from '@src/hooks/navigator/headerShown';
import {
  getUserQuery,
  setUserQuery,
  updateUserQuery
} from '@src/reactQuery/userQuery';
import {actualTheme} from '@src/types/contextTypes';
import {StackNavigation} from '@src/types/globalTypes';
import {LoginFormAction} from '@src/types/loginTypes';
import {DataKey, User} from '@src/types/userTypes';
import {useEffect, useState} from 'react';

const userFormHook = () => {
  const userData = getUserQuery();
  const {colors, dark} = actualTheme();
  const navigation = useNavigation<StackNavigation>();
  const [user, setUser] = useState<User>();
  const {isLoading, isSuccess, error, mutate, data} = updateUserQuery();
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  const handleEditUser = () => {
    user && mutate(user);
  };

  const handleOnchangeInput = (text: never, key: DataKey) => {
    if (user) {
      const userClone = {...user};
      userClone[key] = text;
      setUser(userClone);
    }
  };

  useEffect(() => {
    isSuccess && setUser(data);
  }, [isSuccess, isLoading, error]);

  useEffect(() => {
    !data && userData.data && setUser(userData.data.user);
  }, [userData.data, data]);

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
    error
  };
};
export {userFormHook};
