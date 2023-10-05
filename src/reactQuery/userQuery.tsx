import {useQuery} from '@tanstack/react-query';

import {getUseAuth} from '@src/hooks/auth/useAuth';
import {
  getButtons,
  getCompanyImages,
  getEmployees,
  getPanics
} from '@src/hooks/firebase/company/company';
import {getUser} from '@src/hooks/firebase/user/user';
import {Images, Panics, User} from '@src/types/userTypes';
import {Logos} from '@src/types/imageTypes';
import {SetUserAuthParams} from '@src/types/auth';

export const setEmployeesQuery = (employees: User[]) => {
  const query = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return employees;
    }
  });
  return query;
};

export const setPanicsQuery = (panics: Panics[]) => {
  const query = useQuery({
    queryKey: ['panics'],
    queryFn: async () => {
      return panics;
    }
  });
  return query;
};

export const setCompanyImagesQuery = () => {
  const query = useQuery({
    queryKey: ['companyImages'],
    queryFn: async () => {
      const resultAuth = (await getUseAuth()) as SetUserAuthParams;
      return (
        resultAuth &&
        ((await getCompanyImages(resultAuth.user.city)) as Logos[])
      );
    }
  });
  return query;
};

export const setUserQuery = () => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const resultAuth = (await getUseAuth()) as SetUserAuthParams;
      if (resultAuth) {
        const panicsObserver = getPanics();
        const employeesObserver = getEmployees(resultAuth.user.shop);
        const buttonsObserver = getButtons(resultAuth.user.shop);
        const userData = {
          user: resultAuth.user,
          panicsObserver,
          employeesObserver,
          buttonsObserver
        };
        return userData;
      }
      return null;
    }
  });
  return query;
};

export const getUserQuery = () =>
  useQuery(['user'], {
    refetchOnWindowFocus: false,
    initialData: {
      user: undefined,
      images: [],
      panicsObserver: undefined,
      employeesObserver: undefined,
      buttonsObserver: undefined
    }
  });

export const getEmployeesQuery = () =>
  useQuery(['employees'], {refetchOnWindowFocus: false});

export const getPanicsQuery = () =>
  useQuery(['panics'], {refetchOnWindowFocus: false});

export const getCompanyImagesQuery = () =>
  useQuery(['companyImages'], {
    refetchOnWindowFocus: false,
    initialData: null
  });
