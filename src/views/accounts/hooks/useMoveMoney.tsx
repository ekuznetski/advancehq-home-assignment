import ReactDOM from 'react-dom';
import {useCallback, useMemo, useState} from 'react';

import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';
import MoveMoneyForm from '@views/accounts/components/MoveMoneyForm';

export const useMoveMoney = () => {
  const {value: isOpen, onTrue, onFalse: closeDrawer} = useBoolean();
  const [sourceAccountId, setSourceAccountId] = useState<string>();

  const openDrawer = useCallback(
    (sourceId?: string) => {
      setSourceAccountId(sourceId);
      onTrue();
    },
    [onTrue],
  );

  const MoveMoneyDrawer = useMemo(() => {
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
        title='Move Money'
      >
        <MoveMoneyForm
          key={sourceAccountId ?? 'none'}
          onSuccess={closeDrawer}
          defaultSourceAccountId={sourceAccountId}
        />
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, closeDrawer, sourceAccountId]);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    MoveMoneyDrawer,
  };
};
