import {
  shopInitialData,
  userInitialData
} from '@src/globals/constants/fakeData';
import {getUseAuth, updateUserAuth} from '@src/hooks/auth/useAuth';
import {getButtonsFirebase} from '@src/hooks/firebase/buttons/buttons';
import {
  getCompanyImagesFirebase,
  getShopFirebase
} from '@src/hooks/firebase/company/company';
import {getEmployeesFirebase} from '@src/hooks/firebase/employees/employees';
import {getPanicsFirebase} from '@src/hooks/firebase/panics/panics';
import {editUserFirebase} from '@src/hooks/firebase/user/user';
import {OldData, SetUserAuthParams} from '@src/types/auth';
import {Buttons} from '@src/types/buttons';
import {Logos} from '@src/types/imageTypes';
import {User} from '@src/types/userTypes';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const setEmployeesQuery = (employees: User[]) => {
  const query = useQuery({
    queryKey: ['employees'],
    queryFn: async () => employees
  });
  return query;
};

export const setButtonsQuery = (buttons: Buttons[]) => {
  const query = useQuery({
    queryKey: ['buttons'],
    queryFn: async () => buttons,
    enabled: !!buttons
  });
  return query;
};

export const setCompanyImagesQuery = (userExist: User) => {
  const query = useQuery({
    queryKey: ['companyImages'],
    queryFn: async () => {
      const resultAuth = (await getUseAuth()) as SetUserAuthParams;
      return (
        resultAuth &&
        ((await getCompanyImagesFirebase(resultAuth.user.city)) as Logos[])
      );
    },
    enabled: !!userExist
  });
  return query;
};

export const setShopQuery = (doc: string | undefined) => {
  const query = useQuery({
    queryKey: ['shop'],
    queryFn: async () => doc && (await getShopFirebase(doc)),
    enabled: !!doc
  });
  return query;
};

const dataSetUser = async (data?: User) => {
  const userAuth = await getUseAuth();

  if (userAuth) {
    const resultAuth = userAuth as SetUserAuthParams;
    const user = data ?? resultAuth.user;
    const panicsObserver = getPanicsFirebase(
      user.group_number,
      user.city,
      user.countryCode
    );
    const employeesObserver = getEmployeesFirebase(user.shop);
    const buttonsObserver = getButtonsFirebase(user.shop);
    const userData = {
      user: user,
      panicsObserver,
      employeesObserver,
      buttonsObserver
    };
    return userData;
  } else {
    return userInitialData;
  }
};

export const setUserQuery = (data?: User) => {
  const query = useQuery({
    queryKey: ['user'],
    queryFn: async () => await dataSetUser(data),
    enabled: !!data
  });
  return query;
};

//get data

export const getUserQuery = () =>
  useQuery(['user'], {
    refetchOnWindowFocus: false,
    initialData: userInitialData
  });

export const getEmployeesQuery = () =>
  useQuery(['employees'], {refetchOnWindowFocus: false});

export const getButtonsQuery = () =>
  useQuery(['buttons'], {refetchOnWindowFocus: false});

export const getShopQuery = () =>
  useQuery(['shop'], {
    refetchOnWindowFocus: false,
    initialData: shopInitialData
  });

export const getCompanyImagesQuery = (setImages: boolean) =>
  useQuery(['companyImages'], {
    refetchOnWindowFocus: false,
    enabled: !!setImages
  });

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
