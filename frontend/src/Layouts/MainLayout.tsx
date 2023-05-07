import { Navigate, useOutlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { useAuthContext } from '../context/AuthContext';
import MenuPage from '../pages/MenuPage';
import { apiBaseUrl } from '../config';
import { Spawn } from '../types/Spawn';
import { Notification as BackendNotification } from '../types/Notification';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

type CustomMercureMessage<T extends 'notification' | 'update' | 'delete'> = {
  type: T;
  body: T extends 'notification'
    ? BackendNotification
    : T extends 'update' | 'delete'
    ? Spawn
    : never;
};

const isShowingMenuContext = createContext<
  { isShowing: boolean; toggleIsShowing: () => void } | undefined
>(undefined);
export const useIsShowingMenu = () => useContext(isShowingMenuContext);

const MainLayout: React.FC = () => {
  const outlet = useOutlet();
  const { token, user } = useAuthContext()!;
  const [isShowingMenu, setIsShowingMenu] = useState<boolean>(false);
  const { setBackendNotifications } = useAppContext();

  const getNotifications = useCallback(
    async (
      abort: AbortController,
      page: number | undefined = undefined,
      limit: number | undefined = undefined
    ) => {
      const url =
        !page || !limit
          ? apiBaseUrl + `/notification/user/${user!.id}?`
          : apiBaseUrl +
            `/notification/user/${user!.id}?page=${page}&limit=${limit}`;
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        signal: abort.signal
      });
      setBackendNotifications(
        res.data.map((el: any) => {
          el.notification.isRead = el.isRead;
          return el.notification;
        })
      );
    },
    []
  );

  useEffect(() => {
    const abort = new AbortController();

    let eventSource: EventSource;
    getNotifications(abort).then((res) => {
      const url = new URL('http://localhost:8080/.well-known/mercure');
      url.searchParams.append(
        'topic',
        `https://mercure-updates/users/${user?.id}`
      );
      eventSource = new EventSource(url);
      eventSource.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === 'notification') {
          const mercureMessage = data as CustomMercureMessage<'notification'>;
          mercureMessage.body.isRead = false;
          setBackendNotifications((prev) => [...prev, mercureMessage.body]);
        }
      }; // do something with the payload
    });

    return () => {
      eventSource?.close();
      abort.abort();
    };
  }, []);

  if (!token) return <Navigate to='/login' />;

  return (
    <isShowingMenuContext.Provider
      value={{
        isShowing: isShowingMenu,
        toggleIsShowing: () => setIsShowingMenu((prev) => !prev)
      }}
    >
      <div className='bg-white w-screen overflow-hidden'>
        {isShowingMenu && <MenuPage />}
        {outlet}
        <BottomNav />
      </div>
    </isShowingMenuContext.Provider>
  );
};

export default MainLayout;
