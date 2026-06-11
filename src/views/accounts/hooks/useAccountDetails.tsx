import {useCallback} from 'react';

import {Account} from '@/domain/Account';
import {useDrawer} from '@/hooks/useDrawer';
import {useMoveMoney} from '@views/accounts/hooks/useMoveMoney';
import AccountDetails from '@views/accounts/components/AccountDetails';

export const useAccountDetails = () => {
  const {openDrawer: openMoveMoney, MoveMoneyDrawer} = useMoveMoney();

  const renderContent = useCallback(
    (account: Account | null, close: () => void) =>
      account && (
        <AccountDetails
          account={account}
          onMoveMoney={() => {
            close();
            openMoveMoney(account.account_id);
          }}
        />
      ),
    [openMoveMoney],
  );

  const {isOpen, open, close, Drawer} = useDrawer<Account>({
    drawerWidth: 'lg',
    renderContent,
  });

  return {
    isOpen,
    openDrawer: open,
    closeDrawer: close,
    AccountDetailsDrawer: (
      <>
        {Drawer}
        {MoveMoneyDrawer}
      </>
    ),
  };
};
