'use client';

import {Stack, Typography} from '@mui/material';
import FlexxDashboardWrapper from '@/components/FlexxDashboardWrapper';

const TransactionsPage = () => {
  return (
    <FlexxDashboardWrapper>
      <Typography variant='h4' sx={{fontWeight: 600}}>
        Transactions
      </Typography>
      <Stack
        flexGrow={1}
        alignItems='center'
        justifyContent='center'
        gap='0.5rem'
      >
        <Typography variant='h6' color='text.secondary'>
          Transactions dashboard coming soon
        </Typography>
      </Stack>
    </FlexxDashboardWrapper>
  );
};

export default TransactionsPage;
