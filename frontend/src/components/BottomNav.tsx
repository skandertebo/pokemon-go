import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme
} from '@mui/material';
import {
  EllipsisHorizontalIcon,
  HomeIcon,
  LightBulbIcon,
  TrophyIcon,
  UserCircleIcon
} from '@heroicons/react/24/solid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useIsShowingMenu } from '../Layouts/MainLayout';
import { useAppContext } from '../context/AppContext';
import NotificationIcon from './NotificationIcon';
import useLastNotificationCheck from '../hooks/useLastNotificationCheck';

const BottomNav: React.FC = () => {
  const route = useLocation().pathname;
  const navigate = useNavigate();
  const [value, setValue] = useState<string>(route);
  const iconClassName = 'h-6 w-6 text-white';
  const { palette } = useTheme();
  const { isShowing, toggleIsShowing } = useIsShowingMenu()!;
  const { backendNotifications } = useAppContext();
  const [lastNotificationCheck, setLastNotificationCheck] =
    useLastNotificationCheck();
  const bottomNavigationRoutes = [
    { value: '/', label: 'Home', icon: <HomeIcon className={iconClassName} /> },
    {
      value: '/leaderboard',
      label: 'Leaderboard',
      icon: <TrophyIcon className={iconClassName} />
    },
    {
      value: '/notifications',
      label: 'Notifications',
      icon: (
        <NotificationIcon
          notificationCount={
            backendNotifications.filter((e) => e.date > lastNotificationCheck)
              .length
          }
          className={iconClassName}
        />
      )
    }
  ];

  return (
    <BottomNavigation
      sx={{
        '& .MuiBottomNavigationAction-label': {
          color: 'white',
          zIndex: 200
        }
      }}
      style={{
        position: 'fixed',
        bottom: 0,
        width: '100vw',
        backgroundColor: palette.primary.dark
      }}
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        navigate(newValue);
      }}
    >
      {bottomNavigationRoutes.map((route) => (
        <BottomNavigationAction key={route.value} {...route} />
      ))}
      <BottomNavigationAction
        label='More'
        onClick={() => !isShowing && toggleIsShowing()}
        icon={<EllipsisHorizontalIcon className={iconClassName} />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
