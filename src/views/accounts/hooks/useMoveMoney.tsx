import {useMemo} from 'react';
import ReactDOM from 'react-dom';

import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper from '@components/DrawerWrapper/DrawerWrapper';
import MoveMoneyForm from '@views/accounts/components/MoveMoneyForm';

export const useMoveMoney = () => {
  const {
    value: isOpen,
    onTrue: openDrawer,
    onFalse: closeDrawer,
  } = useBoolean();

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
        <MoveMoneyForm onSuccess={closeDrawer} />
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, closeDrawer]);

  return {
    isOpen,
    openDrawer,
    closeDrawer,
    MoveMoneyDrawer,
  };
};
