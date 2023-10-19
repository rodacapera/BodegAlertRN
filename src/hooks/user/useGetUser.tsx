import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {
  getUserQuery,
  setEmployeesQuery,
  setPanicsQuery,
  setShopQuery
} from '@src/reactQuery/userQuery';
import {GetUserData} from '@src/types/auth';
import {Buttons, Panics, User} from '@src/types/userTypes';
import {UseQueryResult} from '@tanstack/react-query';
import {useEffect, useState} from 'react';

const useGetUser = (setUser?: UseQueryResult) => {
  const {isLoading, error, data} = setUser ?? getUserQuery();
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

  const resultPanics = (
    querySnapshot: FirebaseFirestoreTypes.QuerySnapshot
  ) => {
    setPanics([]);
    querySnapshot.forEach(documentSnapshot => {
      const data = documentSnapshot.data() as Panics;
      setPanics(prev => [...prev, data]);
    });
  };

  const resultEmployees = (
    querySnapshot: FirebaseFirestoreTypes.QuerySnapshot
  ) => {
    setEmployees([]);
    querySnapshot.forEach(value => {
      const data = value.data() as User;
      if (querySnapshot.size > 1) {
        !data.administrator && setEmployees(prev => [...prev, data]);
      } else {
        setEmployees([]);
      }
    });
    setCounterEmployees(querySnapshot.size > 1 ? employees.length : 0);
  };

  const resultButtons = (
    querySnapshot: FirebaseFirestoreTypes.QuerySnapshot
  ) => {
    setButtons([]);
    setCounterButtons(0);
    querySnapshot.forEach(value => {
      const data = value.data() as Buttons;
      setButtons(prev => [...prev, data]);
    });
    setCounterButtons(querySnapshot.size > 1 ? querySnapshot.size : 0);
  };

  useEffect(() => {
    currentData &&
      currentData.user &&
      setShopId(currentData.user.shop.split('/')[1]);
  }, [currentData, shopId]);

  useEffect(() => {
    if (currentData && currentData.panicsObserver) {
      const panicsObserver = currentData.panicsObserver.onSnapshot(
        (documentSnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
          !documentSnapshot.empty && documentSnapshot.size > 0
            ? resultPanics(documentSnapshot)
            : setPanics([]);
        }
      );
      return () => panicsObserver();
    }
  }, [currentData]);

  useEffect(() => {
    if (currentData && currentData.employeesObserver) {
      const employeesObserver = currentData.employeesObserver.onSnapshot(
        (documentSnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
          documentSnapshot && documentSnapshot.size > 0
            ? resultEmployees(documentSnapshot)
            : (setEmployees([]), setCounterEmployees(0));
        }
      );
      return () => employeesObserver();
    }
  }, [currentData]);

  useEffect(() => {
    if (currentData && currentData.user) {
      const buttonsObserver = currentData.buttonsObserver.onSnapshot(
        (documentSnapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
          documentSnapshot && documentSnapshot.size > 0
            ? resultButtons(documentSnapshot)
            : (setButtons([]), setCounterButtons(0));
        }
      );
      return () => buttonsObserver();
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
