'use client';

import React from 'react';

import {Chip, Stack, Typography} from '@mui/material';
import {Account, AccountStatus} from '@/domain/Account';
import {FlexxTable} from '@components/FlexxTable/FlexxTable';
import useFetchAccountTransactions from '@/hooks/useFetchAccountTransactions';
import AdvanceRoutingNumberDisplay from '@components/AdvanceRoutingNumberDisplay';
import AdvanceCurrencyText from '@components/AdvanceCurrencyText/AdvanceCurrencyText';
import AdvanceActionButtons from '@components/AdvanceActionButtons/AdvanceActionButtons';
import useAccountTransactionsTable from '@views/accounts/hooks/useAccountTransactionsTable';
import AdvanceAccountNumberDisplay from '@components/AdvanceAccountNumberDisplay/AdvanceAccountNumberDisplay';

const STATUS_COLOR: Record<AccountStatus, 'success' | 'default' | 'error'> = {
  [AccountStatus.OPEN]: 'success',
  [AccountStatus.CLOSED]: 'default',
  [AccountStatus.INVALID]: 'error',
};

const DetailBlock: React.FC<{label: string; children: React.ReactNode}> = ({
  label,
  children,
}) => (
  <Stack gap='0.1rem'>
    {children}
    <Typography variant='caption' color='text.secondary'>
      {label}
    </Typography>
  </Stack>
);

interface AccountDetailsProps {
  account: Account;
  onMoveMoney?: () => void;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({
  account,
  onMoveMoney,
}) => {
  const {
    data: transactions,
    isLoading,
    isError,
  } = useFetchAccountTransactions(account.account_id);
  const {columns, rows} = useAccountTransactionsTable(transactions);

  return (
    <Stack gap='1.5rem' flexGrow={1}>
      <Stack gap='0.25rem'>
        <Stack direction='row' alignItems='center' gap='0.75rem'>
          <Typography variant='h4' sx={{fontWeight: 700}}>
            {account.name}
          </Typography>
          <Chip
            label={account.status}
            size='small'
            color={STATUS_COLOR[account.status]}
            variant='outlined'
          />
        </Stack>
        <Typography variant='body2' color='text.secondary'>
          {account.bank_name}
        </Typography>
      </Stack>

      <Stack direction='row' gap='3rem' flexWrap='wrap' alignItems='center'>
        <DetailBlock label='Account Number'>
          <AdvanceAccountNumberDisplay
            accountNumber={account.account_number}
            variant='body1'
            fontWeight={600}
          />
        </DetailBlock>
        <DetailBlock label='Routing Number'>
          <AdvanceRoutingNumberDisplay
            routingNumber={account.routing_number}
            variant='body1'
            removeClipboardIcon
          />
        </DetailBlock>
        <DetailBlock label='Balance'>
          <AdvanceCurrencyText
            amount={account.balance}
            variant='h6'
            fontWeight={700}
          />
        </DetailBlock>

        {onMoveMoney && (
          <Stack sx={{marginInlineStart: 'auto'}}>
            <AdvanceActionButtons
              actions={[
                {
                  name: 'Move Money',
                  variant: 'outlined',
                  onClick: onMoveMoney,
                  startIcon: 'fluent--arrow-swap-16-regular',
                },
              ]}
            />
          </Stack>
        )}
      </Stack>

      <Stack gap='0.75rem' flexGrow={1}>
        <Typography variant='h6' sx={{fontWeight: 600}}>
          Transactions
        </Typography>
        <FlexxTable
          columns={columns}
          rows={rows}
          isLoading={isLoading}
          isError={isError}
          skeletonRows={5}
          emptyState='No transactions found'
        />
      </Stack>
    </Stack>
  );
};

export default AccountDetails;
