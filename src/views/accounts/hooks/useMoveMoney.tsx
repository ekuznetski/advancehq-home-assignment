import {useCallback} from 'react';

import {useDrawer} from '@/hooks/useDrawer';
import MoveMoneyForm from '@views/accounts/components/MoveMoneyForm';

export const useMoveMoney = () => {
  const renderContent = useCallback(
    (sourceAccountId: string | null, close: () => void) => (
      <MoveMoneyForm
        key={sourceAccountId ?? 'none'}
        onSuccess={close}
        defaultSourceAccountId={sourceAccountId ?? undefined}
      />
    ),
    [],
  );

  const {isOpen, open, close, Drawer} = useDrawer<string>({
    title: 'Move Money',
    drawerWidth: 'md',
    renderContent,
  });

  return {
    isOpen,
    openDrawer: open,
    closeDrawer: close,
    MoveMoneyDrawer: Drawer,
  };
};
