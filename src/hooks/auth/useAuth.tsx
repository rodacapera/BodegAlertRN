import AsyncStorage from '@react-native-async-storage/async-storage';
import {UserAuthData} from '@src/types/auth';
import {useCallback, useEffect, useState} from 'react';

const getUseAuth = async (): Promise<UserAuthData | null> => {
  const result = await AsyncStorage.getItem('@userAuth');
  return result ? JSON.parse(result) : null;
};

const useAuth = () => {
  const [userUid, setUserUid] = useState<string>();
  const [phone, setPhone] = useState<number>();
  const getAuth = useCallback(async () => {
    const result = await getUseAuth();
    if (result) {
      setUserUid(result.uid);
      setPhone(parseInt(result.phoneNumber));
    }
  }, []);

  useEffect(() => {
    getAuth();
  }, []);

  return {userUid, phone};
};

export {useAuth};
