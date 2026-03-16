import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

export const useIsMounted = () =>
  useSyncExternalStore(
    subscribe,
    () => true, // client
    () => false, // server
  );
