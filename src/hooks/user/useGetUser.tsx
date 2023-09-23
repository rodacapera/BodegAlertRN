import {useEffect} from 'react';
import {useAuth} from '../auth/useAuth';
import {getUser} from '../firebase/user/user';

const useGetUser = () => {
  const {userUid, phone} = useAuth();
  const {user, name} = getUser(userUid!);

  useEffect(() => {}, []);

  return {user, name, phone};
};

export {useGetUser};
