import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';

import {User} from '@src/types/user';
import {
  getButtons,
  getCompanyImages,
  getEmployees,
  getPanics
} from '@src/hooks/firebase/company/company';
import {getUser} from '@src/hooks/firebase/user/user';

const getUserUid = async () => {
  const result = await AsyncStorage.getItem('@userAuth');
  return result ? JSON.parse(result) : null;
};

export const getUserQuery = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {uid} = await getUserUid();
      const user = (await getUser(uid)) as User;
      const images = await getCompanyImages(user.city);
      const panicsObserver = getPanics();
      const employeesObserver = getEmployees(user.shop);
      const buttonsObserver = getButtons(user.shop);
      const userData = {
        user,
        images,
        panicsObserver,
        employeesObserver,
        buttonsObserver
      };
      return userData;
    }
  });
  return query;
};
