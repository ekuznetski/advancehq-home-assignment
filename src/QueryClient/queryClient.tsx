import {MutationCache, QueryCache, QueryClient} from '@tanstack/react-query';

// In v5 the per-type `onError` callbacks moved off `defaultOptions` and onto the
// QueryCache / MutationCache, where they act as global, non-overridable handlers.
const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: error => {
      console.error(
        '[QueryClient] Query error:',
        error instanceof Error ? error.message : error,
      );
    },
  }),
  mutationCache: new MutationCache({
    onError: error => {
      console.error(
        '[QueryClient] Mutation error:',
        error instanceof Error ? error.message : error,
      );
    },
  }),
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 3,
    },
  },
});

export default queryClient;
