import {Panics} from '@src/types/userTypes';
import {useQuery} from '@tanstack/react-query';

export const setPanicsQuery = (panics: Panics[]) => {
  const query = useQuery({
    queryKey: ['panics'],
    queryFn: async () => {
      return panics;
    }
  });
  return query;
};

export const getPanicsQuery = () =>
  useQuery(['panics'], {refetchOnWindowFocus: false});
