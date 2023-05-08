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
import PokemonProgress from '../components/PokemonProgress';
import User from '../types/User';

type CustomMercureMessage<
  T extends 'notification' | 'spawnDelete' | 'spawn' | 'catch'
> = {
  type: T;
  body: T extends 'notification'
    ? BackendNotification
    : T extends 'spawn' | 'catch' | 'spawnDelete'
    ? Spawn
    : never;
};

const isShowingMenuContext = createContext<
  { isShowing: boolean; toggleIsShowing: () => void } | undefined
>(undefined);
export const useIsShowingMenu = () => useContext(isShowingMenuContext);

const spawnsContext = createContext<Spawn[] | undefined>(undefined);
export const useSpawns = () => useContext(spawnsContext);

const MainLayout: React.FC = () => {
  const outlet = useOutlet();
  const { token,user } = useAuthContext()as {
    token: string;
    user: User;
  }
  const [isShowingMenu, setIsShowingMenu] = useState<boolean>(false);
  const { setBackendNotifications } = useAppContext();
  const [spawns, setSpawns] = useState<Spawn[] | undefined>(undefined);

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

  const getSpawns = useCallback(async (abort: AbortController) => {
    const res = await axios.get(apiBaseUrl + `/spawn/near`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      signal: abort.signal
    });
    setSpawns(res.data);
  }, []);

  useEffect(() => {
    const abort = new AbortController();
    const spawnsAbort = new AbortController();
    let eventSource: EventSource;
    Promise.all([getNotifications(abort), getSpawns(spawnsAbort)]).then(
      (res) => {
        const url = new URL('.well-known/mercure', document.baseURI);
        url.searchParams.append(
          'topic',
          `https://mercure-updates/users/${user?.id}`
        );
        url.searchParams.append('topic', `https://mercure-updates/spawn/`);
        eventSource = new EventSource(url);
        eventSource.onmessage = (e) => {
          const data = JSON.parse(e.data);
          if (data.type === 'notification') {
            const mercureMessage = data as CustomMercureMessage<'notification'>;
            mercureMessage.body.isRead = false;
            setBackendNotifications((prev) => [mercureMessage.body, ...prev!]);
          }
          if (data.type === 'spawn') {
            const mercureMessage = data as CustomMercureMessage<'spawn'>;
            setSpawns((prev) => [...prev!, mercureMessage.body]);
          } else if (data.type === 'capture' || data.type === 'deleteSpawn') {
            const mercureMessage = data as CustomMercureMessage<
              'catch' | 'spawnDelete'
            >;
            setSpawns((prev) =>
              prev!.filter((el) => el.id !== mercureMessage.body.id)
            );
          }
        }; // do something with the payload
      }
    );

    return () => {
      abort.abort();
      spawnsAbort.abort();
      eventSource?.close();
    };
  }, []);

  if (!token) return <Navigate to='/login' />

    if (!user.playerTag){
        return(
        <Navigate
        to={'/dashboard'}
       />)
    }
  return (
    <spawnsContext.Provider value={spawns}>
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
    </spawnsContext.Provider>
  );
};

export default MainLayout;
