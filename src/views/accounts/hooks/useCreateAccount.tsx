import {useCallback} from 'react';

import {Account} from '@/domain/Account';
import {useDrawer} from '@/hooks/useDrawer';
import CreateAccountForm from '@views/accounts/components/CreateAccountForm';

export const useCreateAccount = (onCreated?: (account: Account) => void) => {
  const renderContent = useCallback(
    (_payload: void | null, close: () => void) => (
      <CreateAccountForm
        onCreated={account => {
          close();
          onCreated?.(account);
        }}
      />
    ),
    [onCreated],
  );

  const {isOpen, open, close, Drawer} = useDrawer<void>({
    title: 'Create Account',
    drawerWidth: 'md',
    renderContent,
  });

  return {
    isOpen,
    openDrawer: open,
    closeDrawer: close,
    CreateAccountDrawer: Drawer,
  };
};
