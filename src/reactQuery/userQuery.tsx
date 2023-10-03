import {useQuery} from '@tanstack/react-query';

import {getUseAuth} from '@src/hooks/auth/useAuth';
import {
  getButtons,
  getCompanyImages,
  getEmployees,
  getPanics
} from '@src/hooks/firebase/company/company';
import {getUser} from '@src/hooks/firebase/user/user';
import {Images, User} from '@src/types/userTypes';

export const setEmployeesQuery = (employees: User[]) => {
  const query = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return employees;
    }
  });
  return query;
};

export const setUserQuery = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const {uid} = await getUseAuth();
      const user = (await getUser(uid)) as User;
      const images = (await getCompanyImages(user.city)) as Images[];
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

export const getUserQuery = () => {
  const res = useQuery(['user'], {refetchOnWindowFocus: false});
  return res;
};
export const getEmployeesQuery = () => {
  const res = useQuery(['employees'], {refetchOnWindowFocus: false});
  return res;
};
