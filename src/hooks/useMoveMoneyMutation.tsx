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
      // Balances changed on both accounts (and new transactions were created).
      queryClient.invalidateQueries({queryKey: [QueryClientIds.ACCOUNTS]});
      toast.success('Money moved successfully');
    },
  });
};
