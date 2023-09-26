import {Panics, User} from '@src/types/user';
import {useEffect, useState} from 'react';
import {useAuth} from '../auth/useAuth';
import {getPanics, getUser} from '../firebase/user/user';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

const useGetUser = () => {
  const {userUid} = useAuth();
  const [user, setUser] = useState<User>();
  const [panics, setPanics] = useState<Panics[]>([]);

  const resultUser = async (userUid: string) => {
    const userData = (await getUser(userUid)) as User;
    setUser(userData);
  };

  const resultPanics = (documentSnapshot: any) => {
    documentSnapshot.forEach((value: {data: () => Panics}) => {
      const data = value.data() as Panics;
      setPanics(prev => [...prev, data]);
    });
  };

  useEffect(() => {
    if (userUid) {
      resultUser(userUid);
      const subscriber = getPanics(userUid).onSnapshot(documentSnapshot => {
        resultPanics(documentSnapshot);
      });
      return () => subscriber();
    }
  }, [userUid]);

  return {user, panics};
};

export {useGetUser};
