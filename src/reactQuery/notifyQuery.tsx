import {getPanicsFirebase} from '@src/hooks/firebase/panics/panics';
import {Panics} from '@src/types/userTypes';
import {useQuery} from '@tanstack/react-query';

// export const getPanicsQuery = () => {
//   const query = useQuery({
//     queryKey: ['panics'],
//     queryFn: async () => {
//       const panicsObserver = getPanicsFirebase();
//       const data = {panicsObserver};
//       return data;
//     }
//   });
//   return query;
// };

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
