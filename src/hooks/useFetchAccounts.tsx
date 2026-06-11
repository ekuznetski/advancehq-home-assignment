import {Account} from '@/domain/Account';
import flexxApiService from '@/flexxApi/flexxApiService';
import {QueryClientIds} from '@/QueryClient/queryClient.ids';
import {keepPreviousData, useQuery} from '@tanstack/react-query';

interface useFetchAccountsArgs {
  searchQuery?: string;
}

const useFetchAccounts = (args?: useFetchAccountsArgs) => {
  const searchTerm = args?.searchQuery ?? '';

  return useQuery<Account[]>({
    queryKey: [QueryClientIds.ACCOUNTS, searchTerm],
    queryFn: () => flexxApiService().fetchAccounts({search_term: searchTerm}),
    placeholderData: keepPreviousData,
  });
};

export default useFetchAccounts;
