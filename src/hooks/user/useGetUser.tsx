import {
  getUserQuery,
  setEmployeesQuery,
  setPanicsQuery
} from '@src/reactQuery/userQuery';
import {GetUserData} from '@src/types/auth';
import {Buttons, Panics, User} from '@src/types/userTypes';
import {useLayoutEffect, useState} from 'react';

const useGetUser = () => {
  const res = getUserQuery();
  const {isLoading, error} = res;
  const data = res.data as GetUserData;
  const [panics, setPanics] = useState<Panics[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [buttons, setButtons] = useState<Buttons[]>([]);
  const [counterButtons, setCounterButtons] = useState<number>();
  const [counterEmployees, setCounterEmployees] = useState<number>();
  setEmployeesQuery(employees);
  setPanicsQuery(panics);

  const resultPanics = (documentSnapshot: any) => {
    setPanics([]);
    documentSnapshot.forEach((value: {data: () => Panics}) => {
      const data = value.data();
      setPanics(prev => [...prev, data]);
    });
  };

  const resultEmployees = (querySnapshot: any) => {
    setEmployees([]);
    querySnapshot.forEach((value: {data: () => User}) => {
      const data = value.data() as User;
      setEmployees(prev => [...prev, data]);
    });
    setCounterEmployees(querySnapshot.size);
  };

  const resultButtons = (querySnapshot: any) => {
    setButtons([]);
    setCounterButtons(0);
    querySnapshot.forEach((value: {data: () => Buttons}) => {
      const data = value.data() as Buttons;
      setButtons(prev => [...prev, data]);
    });
    setCounterButtons(querySnapshot.size);
  };

  useLayoutEffect(() => {
    if (data && data.user) {
      const panicObserver = data.panicsObserver.onSnapshot(
        (documentSnapshot: any) => {
          resultPanics(documentSnapshot);
        }
      );
      const employeesObserver = data.employeesObserver.onSnapshot(
        (documentSnapshot: any) => {
          resultEmployees(documentSnapshot);
        }
      );
      const buttonsObserver = data.buttonsObserver.onSnapshot(
        (documentSnapshot: any) => {
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
