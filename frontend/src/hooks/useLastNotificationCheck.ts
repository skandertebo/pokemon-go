import { useCallback, useState } from 'react';

export default function useLastNotificationCheck(): [
  number,
  (lastNotificationCheck: number) => void
] {
  const [lastNotificationCheck, setLastNotificationCheck] = useState<number>(
    localStorage.getItem('lastNotificationCheck')
      ? parseInt(localStorage.getItem('lastNotificationCheck')!)
      : 0
  );

  const updateLastNotificationCheck = useCallback(
    (lastNotificationCheck: number) => {
      localStorage.setItem(
        'lastNotificationCheck',
        lastNotificationCheck.toString()
      );
      setLastNotificationCheck(lastNotificationCheck);
    },
    [setLastNotificationCheck]
  );

  return [lastNotificationCheck, updateLastNotificationCheck];
}
