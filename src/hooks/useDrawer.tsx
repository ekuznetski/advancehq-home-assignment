import ReactDOM from 'react-dom';
import {ReactNode, useCallback, useMemo, useState} from 'react';

import {useBoolean} from '@/hooks/useBoolean';
import DrawerWrapper, {
  drawerSizes,
} from '@components/DrawerWrapper/DrawerWrapper';

interface UseDrawerConfig<TPayload> {
  title?: string;
  drawerWidth?: drawerSizes;
  renderContent: (payload: TPayload | null, close: () => void) => ReactNode;
}

/**
 * Shared drawer primitive: owns the open state, the portal and the
 * DrawerWrapper boilerplate so every feature drawer is a thin config.
 * `open(payload)` stores the payload and opens; `renderContent` receives it.
 */
export const useDrawer = <TPayload = void,>({
  title,
  drawerWidth,
  renderContent,
}: UseDrawerConfig<TPayload>) => {
  const {value: isOpen, onTrue, onFalse: close} = useBoolean();
  const [payload, setPayload] = useState<TPayload | null>(null);

  const open = useCallback(
    (nextPayload?: TPayload) => {
      setPayload(nextPayload ?? null);
      onTrue();
    },
    [onTrue],
  );

  const Drawer = useMemo(() => {
    if (typeof window === 'undefined') return null;

    return ReactDOM.createPortal(
      <DrawerWrapper
        open={isOpen}
        onClose={close}
        fixedActions={false}
        title={title}
        drawerWidth={drawerWidth}
        actions={[{icon: 'fluent--dismiss-24-regular', onClick: close}]}
      >
        {renderContent(payload, close)}
      </DrawerWrapper>,
      document.body,
    );
  }, [isOpen, close, title, drawerWidth, renderContent, payload]);

  return {isOpen, open, close, payload, Drawer};
};
