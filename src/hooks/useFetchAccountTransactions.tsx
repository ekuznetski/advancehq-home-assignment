import {useQuery} from '@tanstack/react-query';
import {Transaction} from '@/domain/Transaction';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

const useFetchAccountTransactions = (accountId?: string) => {
  return useQuery<Transaction[]>({
    queryKey: [QueryClientIds.ACCOUNT_TRANSACTIONS, accountId],
    queryFn: () => flexxApiService().fetchAccountTransactions(accountId ?? ''),
    enabled: !!accountId,
  });
};

export default useFetchAccountTransactions;
