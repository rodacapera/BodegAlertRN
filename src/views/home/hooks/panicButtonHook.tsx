import {config} from '@src/hooks/config/config';
import {useGetUser} from '@src/hooks/user/useGetUser';
import {Configuration} from '@src/types/configuration';

const panicButtonHook = () => {
  const {user} = useGetUser();
  const configuration = config() as Configuration;

  return {configuration, user};
};
export {panicButtonHook};
