import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export const useIsMobile = () =>
  useSyncExternalStore(
    subscribe,
    () => window.innerWidth < 768,
    () => false,
  );
