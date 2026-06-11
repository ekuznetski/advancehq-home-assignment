'use client';

import {toast} from 'react-toastify';

import {MoveMoneyPayload} from '@/domain/MoveMoney';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export const useMoveMoneyMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, MoveMoneyPayload>({
    mutationFn: payload => flexxApiService().moveMoney(payload),
    onSuccess: () => {
      // Balances changed on both accounts and new transactions were created,
      // so refresh accounts as well as every transaction list.
      queryClient.invalidateQueries({queryKey: [QueryClientIds.ACCOUNTS]});
      queryClient.invalidateQueries({
        queryKey: [QueryClientIds.ACCOUNT_TRANSACTIONS],
      });
      queryClient.invalidateQueries({queryKey: [QueryClientIds.TRANSACTIONS]});
      toast.success('Money moved successfully');
    },
  });
};
