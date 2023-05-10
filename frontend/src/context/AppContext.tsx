import { createPortal } from 'react-dom';
import { Notification as NotificationType } from '../types';
import { Notification as BackendNotification } from '../types/Notification';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import { Alert } from '@material-tailwind/react';
import { Backdrop, CircularProgress } from '@mui/material';
import PokemonProgress from '../components/PokemonProgress';
import useLastNotificationCheck from '../hooks/useLastNotificationCheck';
import { apiBaseUrl } from '../config';
import { useAuthContext } from './AuthContext';
import OfflinePage from '../pages/OfflinePage';
type AppContextType = {
  makeNotification: (props: NotificationType) => void;
  enableWaiting: () => void;
  disableWaiting: () => void;
  geoLocationPosition: GeolocationPosition | undefined | null;
  backendNotifications: BackendNotification[];
  setBackendNotifications: React.Dispatch<
    React.SetStateAction<BackendNotification[]>
  >;
};

export const AppContext = createContext<AppContextType>({} as AppContextType);
export const useAppContext = () => useContext(AppContext);

export const AppContextProvider: React.FC<React.PropsWithChildren> = ({
  children
}) => {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );
  const [waiting, setWaiting] = useState<boolean>(false);
  const [geoLocationPosition, setGeolocationPosition] = useState<
    GeolocationPosition | null | undefined
  >(undefined);
  const enableWaiting = useCallback(() => {
    setWaiting(true);
  }, [setWaiting]);

  const disableWaiting = useCallback(() => {
    setWaiting(false);
  }, [setWaiting]);

  const makeNotification = useCallback<(arg0: NotificationType) => void>(
    ({ message, type, duration = 4000 }) => {
      setNotification({ message, type, duration });
      setTimeout(() => {
        setNotification(null);
      }, duration);
    },
    [setNotification]
  );

  const [backendNotifications, setBackendNotifications] = useState<
    BackendNotification[]
  >([]);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          setGeolocationPosition(position);
        },
        () => {
          setGeolocationPosition(null);
        },
        {
          enableHighAccuracy: true
        }
      );
    } else {
      setGeolocationPosition(null);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        makeNotification,
        enableWaiting,
        disableWaiting,
        geoLocationPosition,
        backendNotifications: backendNotifications,
        setBackendNotifications
      }}
    >
      {notification &&
        createPortal(
          <NotificationComponent {...notification} />,
          document.body
        )}
      {waiting &&
        createPortal(
          <Backdrop
            open={waiting}
            style={{
              zIndex: 999
            }}
          >
            <CircularProgress color='inherit' />
          </Backdrop>,
          document.body
        )}
      {geoLocationPosition ? (
        children
      ) : (
        <Backdrop open={true}>
          <PokemonProgress />
        </Backdrop>
      )}
    </AppContext.Provider>
  );
};

const notificationColors: {
  [key: string]: 'green' | 'red' | 'blue';
} = {
  success: 'green',
  error: 'red',
  info: 'blue'
};

const NotificationComponent: React.FC<NotificationType> = ({
  message,
  type
}) => {
  return (
    <div className='absolute bottom-10 left-5 z-10'>
      <Alert color={notificationColors[type]} style={{ width: 'fit-content' }}>
        {message}
      </Alert>
    </div>
  );
};

export default AppContext;
