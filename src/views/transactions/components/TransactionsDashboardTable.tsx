'use client';

import React, {useMemo} from 'react';

import {useGlobalSearch} from '@core/hooks/useGlobalSearch';
import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useFetchTransactions from '@/hooks/useFetchTransactions';
import useTransactionsTable from '@views/transactions/hooks/useTransactionsTable';

const TransactionsDashboardTable: React.FC = () => {
  const {searchQuery} = useGlobalSearch();
  const {data, isLoading, isError} = useFetchTransactions();

  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return data;

    const query = searchQuery.toLowerCase();
    return data?.filter(transaction =>
      [
        transaction.merchant,
        transaction.account_name,
        transaction.direction,
        transaction.status,
      ]
        .filter(Boolean)
        .some(value => value!.toLowerCase().includes(query)),
    );
  }, [data, searchQuery]);

  const {columns, rows} = useTransactionsTable(filteredTransactions);

  return (
    <FlexxTable
      columns={columns}
      rows={rows}
      isLoading={isLoading}
      isError={isError}
      skeletonRows={10}
      emptyState='No transactions found'
    />
  );
};

export default TransactionsDashboardTable;
