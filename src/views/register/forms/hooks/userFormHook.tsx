import {buttonActionInitialState} from '@src/globals/constants/login';
import {getUserQuery, updateUserQuery} from '@src/reactQuery/userQuery';
import {LoginFormAction} from '@src/types/loginTypes';
import {User} from '@src/types/userTypes';
import {useEffect, useState} from 'react';

const userFormHook = () => {
  const userData = getUserQuery();
  const [user, setUser] = useState<User>();
  const {isLoading, error} = updateUserQuery(user as User);

  const isLoadingUserData = userData.isLoading;
  const [currentButtonAction, setCurrentButtonAction] =
    useState<LoginFormAction>(buttonActionInitialState);

  const handleEditUser = (data: User) => {
    setUser(data);
  };

  useEffect(() => {
    userData.data && setUser(userData.data.user);
  }, [userData.data]);

  useEffect(() => {
    user && (user.phone = currentButtonAction.phone);
  }, [currentButtonAction]);
  console.log('user', user?.phone);

  return {
    user: userData.data.user as unknown as User,
    isLoadingUserData,
    currentButtonAction,
    setCurrentButtonAction
  };
};
export {userFormHook};
