import ReactDOM from 'react-dom';
import {useCallback, useMemo} from 'react';

import {Account} from '@/domain/Account';
import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';
import CreateAccountForm from '@views/accounts/components/CreateAccountForm';

export const useCreateAccount = (onCreated?: (account: Account) => void) => {
  const {
    value: isOpen,
    onTrue: openDrawer,
    onFalse: closeDrawer,
  } = useBoolean();

  const handleCreated = useCallback(
    (account: Account) => {
      closeDrawer();
      onCreated?.(account);
    },
    [closeDrawer, onCreated],
  );

  const CreateAccountDrawer = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return ReactDOM.createPortal(
      <DrawerWrapper
        open={isOpen}
        removePaddingBottom
        onClose={closeDrawer}
        actions={[
          {
            icon: 'fluent--dismiss-24-regular',
            onClick: closeDrawer,
          },
        ]}
        drawerWidth='md'
        title='Create Account'
      >
        <CreateAccountForm onCreated={handleCreated} />
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, closeDrawer, handleCreated]);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    CreateAccountDrawer,
  };
};
