import {getUserQuery} from '@src/reactQuery/userQuery';
import {Buttons, Panics, User} from '@src/types/user';
import {useEffect, useState} from 'react';
import {useAuth} from '../auth/useAuth';
import {getUser} from '../firebase/user/user';

export const dataUSer = async (userUid: string) => {
  const userData = (await getUser(userUid)) as User;
  return userData;
};

const useGetUser = () => {
  const {isLoading, error, data} = getUserQuery();
  const [panics, setPanics] = useState<Panics[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [buttons, setButtons] = useState<Buttons[]>([]);
  const [counterButtons, setCounterButtons] = useState<number>();
  const [counterEmployees, setCounterEmployees] = useState<number>();

  const resultPanics = (documentSnapshot: any) => {
    documentSnapshot.forEach((value: {data: () => Panics}) => {
      const data = value.data() as Panics;
      setPanics(prev => [...prev, data]);
    });
  };

  const resultEmployees = (querySnapshot: any) => {
    querySnapshot.forEach((value: {data: () => User}) => {
      const data = value.data() as User;
      // console.log('data', data);

      setEmployees(prev => [...prev, data]);
    });
    setCounterEmployees(querySnapshot.size);
  };

  const resultButtons = (querySnapshot: any) => {
    querySnapshot.forEach((value: {data: () => Buttons}) => {
      const data = value.data() as Buttons;
      setButtons(prev => [...prev, data]);
    });
    setCounterButtons(querySnapshot.size);
  };

  useEffect(() => {
    if (data) {
      const panicObserver = data.panicsObserver.onSnapshot(documentSnapshot => {
        resultPanics(documentSnapshot);
      });
      const employeesObserver = data.employeesObserver.onSnapshot(
        documentSnapshot => {
          resultEmployees(documentSnapshot);
        }
      );
      const buttonsObserver = data.buttonsObserver.onSnapshot(
        documentSnapshot => {
          resultButtons(documentSnapshot);
        }
      );
      return () => (panicObserver(), employeesObserver(), buttonsObserver());
    }
  }, [data]);

  return {
    user: data?.user,
    panics,
    employees,
    counterEmployees,
    images: data?.images,
    isLoading,
    error,
    buttons,
    counterButtons
  };
};

export {useGetUser};
