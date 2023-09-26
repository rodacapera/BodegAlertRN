import {Panics, User} from '@src/types/user';
import {useEffect, useState} from 'react';
import {useAuth} from '../auth/useAuth';
import {getPanics, getUser} from '../firebase/user/user';

const useGetUser = () => {
  const {userUid} = useAuth();
  const [user, setUser] = useState<User>();
  const [panics, setPanics] = useState<Panics[]>([]);

  const resultUser = async (userUid: string) => {
    const userData = (await getUser(userUid)) as User;
    setUser(userData);
  };

  const resultPanics = (userUid: string) => {
    getPanics(userUid).then(querySnapshot => {
      querySnapshot.forEach(value => {
        const data = value.data() as Panics;
        setPanics(prev => [...prev, data]);
      });
    });
  };

  useEffect(() => {
    if (userUid) {
      resultUser(userUid);
      resultPanics(userUid);
    }
  }, [userUid]);

  return {user, panics};
};

export {useGetUser};
