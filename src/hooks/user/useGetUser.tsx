import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getUserQuery,
  setEmployeesQuery,
  setPanicsQuery,
  setShopQuery
} from '@src/reactQuery/userQuery';
import {GetUserData} from '@src/types/auth';
import {Buttons, Panics, User} from '@src/types/userTypes';
import {useLayoutEffect, useState} from 'react';

const useGetUser = () => {
  const {isLoading, error, data} = getUserQuery();
  const currentData = data as GetUserData;
  const [panics, setPanics] = useState<Panics[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [buttons, setButtons] = useState<Buttons[]>([]);
  const [counterButtons, setCounterButtons] = useState<number>();
  const [counterEmployees, setCounterEmployees] = useState<number>();
  const [shopId, setShopId] = useState<string>();
  setEmployeesQuery(employees);
  setPanicsQuery(panics);
  setShopQuery(shopId);

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

    setCounterEmployees(querySnapshot.size > 1 ? querySnapshot.size : 0);
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
    if (currentData && currentData.user) {
      const panicObserver = currentData.panicsObserver.onSnapshot(
        (documentSnapshot: any) => {
          resultPanics(documentSnapshot);
        }
      );
      const employeesObserver = currentData.employeesObserver.onSnapshot(
        (documentSnapshot: any) => {
          resultEmployees(documentSnapshot);
        }
      );
      const buttonsObserver = currentData.buttonsObserver.onSnapshot(
        (documentSnapshot: any) => {
          resultButtons(documentSnapshot);
        }
      );
      setShopId(currentData.user.shop.split('/')[1]);
      return () => (panicObserver(), employeesObserver(), buttonsObserver());
    }
  }, [currentData]);

  return {
    user: currentData?.user,
    panics,
    employees,
    counterEmployees,
    isLoading,
    error,
    buttons,
    counterButtons
  };
};

export {useGetUser};
