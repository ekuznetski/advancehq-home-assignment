'use client';

import {toast} from 'react-toastify';

import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';
import {Account, CreateAccountPayload} from '@/domain/Account';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useCreateAccountMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<Account, Error, CreateAccountPayload>({
    mutationFn: payload => flexxApiService().createAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: [QueryClientIds.ACCOUNTS]});
      toast.success('Account created successfully');
    },
  });
};
