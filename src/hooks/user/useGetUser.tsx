import {User} from '@src/types/user';
import {useEffect, useState} from 'react';
import {useAuth} from '../auth/useAuth';
import {getUser} from '../firebase/user/user';

const useGetUser = () => {
  const {userUid, phone} = useAuth();
  const [user, setUser] = useState<User>();

  const result = async (userUid: string) => {
    const userData = (await getUser(userUid)) as User;
    setUser(userData);
  };

  useEffect(() => {
    userUid && result(userUid);
  }, [userUid]);

  return {user};
};

export {useGetUser};
