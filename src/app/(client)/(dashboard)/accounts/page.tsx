'use client';

import {Typography} from '@mui/material';
import AccountsCtas from '@views/accounts/components/AccountsCtas';
import FlexxDashboardWrapper from '@/components/FlexxDashboardWrapper';
import {useAccountDetails} from '@views/accounts/hooks/useAccountDetails';
import AccountsDashboardTable from '@views/accounts/components/AccountsDashboardTable';

const AccountsPage = () => {
  const {openDrawer, AccountDetailsDrawer} = useAccountDetails();

  return (
    <FlexxDashboardWrapper>
      <Typography variant='h4' sx={{fontWeight: 600}}>
        Accounts
      </Typography>
      <AccountsCtas onAccountCreated={openDrawer} />
      <AccountsDashboardTable onRowClick={openDrawer} />
      {AccountDetailsDrawer}
    </FlexxDashboardWrapper>
  );
};

export default AccountsPage;
