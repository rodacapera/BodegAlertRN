import {getGroupById} from '@src/hooks/firebase/groups/groups';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';

export const setGroupQuery = (group_number?: string) => {
  const query = useQuery({
    queryKey: ['groups'],
    queryFn: async () => group_number && (await getGroupById(group_number)),
    enabled: !!group_number
  });
  return query;
};

export const updateGroupQuery = () => {
  const queryClient = useQueryClient();
  const responseMutation = useMutation({
    mutationFn: (group_id: string) => getGroupById(group_id),
    retry: true,
    onSuccess: async data => {
      queryClient.setQueryData(['groups'], data.data());
      return data;
    },
    onError: error => {
      console.debug('data onerror', error);
    }
  });
  return responseMutation;
};
