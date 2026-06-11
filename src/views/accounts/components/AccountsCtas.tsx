import React from 'react';

import {Stack} from '@mui/material';
import {useMoveMoney} from '@views/accounts/hooks/useMoveMoney';
import {useCreateAccount} from '@views/accounts/hooks/useCreateAccount';
import {ActionButtonConfig} from '@components/AdvanceActionButtons/types';
import AdvanceActionButtons from '@components/AdvanceActionButtons/AdvanceActionButtons';

const AccountsCtas: React.FC = () => {
  const {openDrawer: openCreateAccount, CreateAccountDrawer} =
    useCreateAccount();
  const {openDrawer: openMoveMoney, MoveMoneyDrawer} = useMoveMoney();

  const actions: ActionButtonConfig[] = [
    {
      name: 'Add Account',
      variant: 'outlined',
      onClick: openCreateAccount,
      startIcon: 'fluent--add-circle-20-regular',
    },
    {
      name: 'Move Money',
      variant: 'outlined',
      onClick: openMoveMoney,
      startIcon: 'fluent--arrow-swap-16-regular',
    },
  ];

  return (
    <>
      <Stack direction='row' gap={'1rem'} alignItems={'center'}>
        <AdvanceActionButtons actions={actions} />
      </Stack>
      {CreateAccountDrawer}
      {MoveMoneyDrawer}
    </>
  );
};

export default AccountsCtas;
