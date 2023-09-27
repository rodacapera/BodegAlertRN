import {Panics, User} from '@src/types/user';
import {useEffect, useState} from 'react';
import {useAuth} from '../auth/useAuth';
import {getPanics, getUser} from '../firebase/user/user';
import {getEmployees} from '../firebase/employees/employees';

export const dataUSer = async (userUid: string) => {
  const userData = (await getUser(userUid)) as User;
  return userData;
};

const useGetUser = () => {
  const {userUid} = useAuth();
  const [user, setUser] = useState<User>();
  const [panics, setPanics] = useState<Panics[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [buttons, setButtons] = useState();
  const [counterEmployees, setCounterEmployees] = useState<number>();
  const [counterButtons, setCounterButtons] = useState<number>();

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

  const resultEmployees = () => {
    getEmployees(user?.shop).then(querySnapshot => {
      querySnapshot.forEach(value => {
        const data = value.data() as User;
        // console.log('data', data.alias);

        setEmployees(prev => [...prev, data]);
      });
      setCounterEmployees(querySnapshot.size);
    });
  };

  const resultButtons = (userUid: string) => {};

  // useEffect(() => {
  //   console.log('ooooo>>>>', user);

  //   user && resultEmployees();
  // }, [user]);

  useEffect(() => {
    if (userUid) {
      console.log('ppppp');

      // resultUser(userUid);
      const subscriber = getPanics(userUid).onSnapshot(documentSnapshot => {
        resultPanics(documentSnapshot);
      });
      return () => subscriber();
    }
  }, [userUid]);

  return {user, panics, employees, counterEmployees};
};

export {useGetUser};
