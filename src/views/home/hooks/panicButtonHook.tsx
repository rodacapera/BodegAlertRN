import {useGetUser} from '@src/hooks/user/useGetUser';
import {useEffect, useState} from 'react';
import {getConfigurationFirebase} from '@src/hooks/firebase/config/config';
import {Configuration} from '@src/types/configuration';

const panicButtonHook = () => {
  const {user} = useGetUser();
  const [configuration, setConfiguration] = useState<Configuration>();

  const getConfig = (countryCode: string) => {
    getConfigurationFirebase(countryCode).then(querySnapshot => {
      querySnapshot.forEach(value => {
        const data = value.data() as Configuration;
        setConfiguration(data);
      });
    });
  };

  useEffect(() => {
    user && getConfig(user.countryCode);
  }, [user]);

  return {configuration, user};
};
export {panicButtonHook};
