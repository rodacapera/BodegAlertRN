import {getPanics} from '@src/hooks/firebase/company/company';
import {useQuery} from '@tanstack/react-query';

export const getPanicsQuery = () => {
  const query = useQuery({
    queryKey: ['panics'],
    queryFn: async () => {
      const panicsObserver = getPanics();
      const data = {panicsObserver};
      return data;
    }
  });
  return query;
};
