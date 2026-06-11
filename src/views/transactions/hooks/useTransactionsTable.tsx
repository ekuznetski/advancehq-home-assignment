import {useMemo} from 'react';

import {Transaction} from '@/domain/Transaction';
import {formatTransactionDate} from '@/utils/transaction.utils';
import {
  FlexxColumn,
  FlexxTableRow,
} from '@components/FlexxTable/domain/FlexxTable';

const columns: FlexxColumn[] = [
  {field: 'date', headerName: 'Date'},
  {field: 'account', headerName: 'Account'},
  {field: 'merchant', headerName: 'Merchant'},
  {field: 'amount', headerName: 'Amount', currency: true, align: 'right'},
  {field: 'direction', headerName: 'Direction'},
  {field: 'status', headerName: 'Status'},
];

const useTransactionsTable = (transactions: Transaction[] | undefined) => {
  const rows: FlexxTableRow[] = useMemo(() => {
    if (!transactions) return [];

    return transactions.map(transaction => ({
      data: {
        date: {
          value: Date.parse(transaction.created_at) || 0,
          content: formatTransactionDate(transaction.created_at),
        },
        account: transaction.account_name || 'N/A',
        merchant: transaction.merchant,
        amount: transaction.amount,
        direction: transaction.direction,
        status: transaction.status,
      },
    }));
  }, [transactions]);

  return {columns, rows};
};

export default useTransactionsTable;
