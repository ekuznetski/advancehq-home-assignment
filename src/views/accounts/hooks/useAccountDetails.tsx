import ReactDOM from 'react-dom';
import {useCallback, useMemo, useState} from 'react';

import {Account} from '@/domain/Account';
import {useBoolean} from '@/hooks/useBoolean';
import {useMoveMoney} from '@views/accounts/hooks/useMoveMoney';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';
import AccountDetails from '@views/accounts/components/AccountDetails';

export const useAccountDetails = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const {value: isOpen, onTrue, onFalse: closeDrawer} = useBoolean();
  const {openDrawer: openMoveMoney, MoveMoneyDrawer} = useMoveMoney();

  const openDrawer = useCallback(
    (selected: Account) => {
      setAccount(selected);
      onTrue();
    },
    [onTrue],
  );

  const handleMoveMoney = useCallback(() => {
    if (!account) return;
    closeDrawer();
    openMoveMoney(account.account_id);
  }, [account, closeDrawer, openMoveMoney]);

  const AccountDetailsDrawer = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return ReactDOM.createPortal(
      <>
        <DrawerWrapper
          open={isOpen}
          onClose={closeDrawer}
          drawerWidth='lg'
          actions={[
            {
              icon: 'fluent--dismiss-24-regular',
              onClick: closeDrawer,
            },
          ]}
        >
          {account && (
            <AccountDetails account={account} onMoveMoney={handleMoveMoney} />
          )}
        </DrawerWrapper>
        {MoveMoneyDrawer}
      </>,
      document.body,
    );
  }, [isOpen, account, closeDrawer, handleMoveMoney, MoveMoneyDrawer]);

  return {
    openDrawer,
    closeDrawer,
    AccountDetailsDrawer,
  };
};
