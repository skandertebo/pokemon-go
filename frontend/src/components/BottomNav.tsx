import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme
} from '@mui/material';
import {
  HomeIcon,
  LightBulbIcon,
  TrophyIcon,
  UserCircleIcon
} from '@heroicons/react/24/solid';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const route = useLocation().pathname;
  const navigate = useNavigate();
  const [value, setValue] = useState<string>(route);
  const iconClassName = 'h-6 w-6 text-white';
  const { palette } = useTheme();

  const bottomNavigationRoutes = [
    { value: '/', label: 'Home', icon: <HomeIcon className={iconClassName} /> },
    {
      value: '/profile',
      label: 'Profile',
      icon: <UserCircleIcon className={iconClassName} />
    },
    {
      value: '/insights',
      label: 'Insights',
      icon: <LightBulbIcon className={iconClassName} />
    },
    {
      value: '/leaderboard',
      label: 'Leaderboard',
      icon: <TrophyIcon className={iconClassName} />
    },
    {
      value: '/stat',
      label : 'Statistic',
      icon: <TrophyIcon className={iconClassName} />
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
        backgroundColor: palette.primary.dark,
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
    </BottomNavigation>
  );
};

export default BottomNav;
