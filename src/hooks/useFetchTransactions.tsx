import {useQuery} from '@tanstack/react-query';
import {Transaction} from '@/domain/Transaction';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';

const useFetchTransactions = () => {
  return useQuery<Transaction[]>({
    queryKey: [QueryClientIds.TRANSACTIONS],
    queryFn: () => flexxApiService().fetchTransactions(),
  });
};

export default useFetchTransactions;
