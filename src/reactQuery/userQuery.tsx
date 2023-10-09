import {getUseAuth, updateUserAuth} from '@src/hooks/auth/useAuth';
import {
  getButtonsFirebase,
  getCompanyImagesFirebase,
  getEmployeesFirebase,
  getPanicsFirebase,
  getShopFirebase
} from '@src/hooks/firebase/company/company';
import {editUserFirebase} from '@src/hooks/firebase/user/user';
import {OldData, SetUserAuthParams} from '@src/types/auth';
import {Logos} from '@src/types/imageTypes';
import {Panics, User} from '@src/types/userTypes';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

//set data

export const setEmployeesQuery = (employees: User[]) => {
  const query = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      return employees;
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
        ((await getCompanyImagesFirebase(resultAuth.user.city)) as Logos[])
      );
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

export const setShopQuery = (doc: string | undefined) => {
  const query = useQuery({
    queryKey: ['shop'],
    queryFn: async () => await getShopFirebase(doc!),
    enabled: !!doc
  });
  return query;
};

const dataSetUser = async (data?: User) => {
  const userAuth = await getUseAuth();
  const resultAuth = userAuth as SetUserAuthParams;
  const user = data ?? resultAuth.user;
  if (user) {
    const panicsObserver = getPanicsFirebase();
    const employeesObserver = getEmployeesFirebase(user.shop);
    const buttonsObserver = getButtonsFirebase(user.shop);
    const userData = {
      user: user,
      panicsObserver,
      employeesObserver,
      buttonsObserver
    };
    return userData;
  }
  return null;
};

export const setUserQuery = (data?: User) => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => await dataSetUser(data)
  });
  return query;
};

//get data

export const getUserQuery = () =>
  useQuery(['user'], {
    refetchOnWindowFocus: false,
    initialData: {
      user: undefined,
      panicsObserver: undefined,
      employeesObserver: undefined,
      buttonsObserver: undefined
    }
  });

export const getEmployeesQuery = () =>
  useQuery(['employees'], {refetchOnWindowFocus: false});

export const getPanicsQuery = () =>
  useQuery(['panics'], {refetchOnWindowFocus: false});

export const getShopQuery = () =>
  useQuery(['shop'], {refetchOnWindowFocus: false});

export const getCompanyImagesQuery = () =>
  useQuery(['companyImages'], {
    refetchOnWindowFocus: false,
    initialData: null
  });

//mutate data

export const updateUserQuery = () => {
  const queryClient = useQueryClient();
  const responseMutation = useMutation({
    mutationFn: (user: User) => editUserFirebase(user),
    retry: true,
    onSuccess: async data => {
      const newData = (await dataSetUser(data)) as OldData;
      queryClient.setQueryData(['user'], () => newData);
      return updateUserAuth(data.user_uid, data);
    },
    onError: error => {
      console.error('data onerror', error);
    }
  });
  return responseMutation;
};
