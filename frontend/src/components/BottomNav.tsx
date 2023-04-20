import React, { useState } from 'react';
import {
  BottomNavigation,
  BottomNavigationAction,
  useTheme
} from '@mui/material';
import {
  HomeIcon,
  LightBulbIcon,
  UserCircleIcon
} from '@heroicons/react/24/solid';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const route = useLocation().pathname;
  const navigate = useNavigate();
  const [value, setValue] = useState<string>(route);
  const iconClassName = 'h-6 w-6 text-white';
  const { palette } = useTheme();
  return (
    <BottomNavigation
      sx={{
        '& .MuiBottomNavigationAction-label': {
          color: 'white'
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
      <BottomNavigationAction
        value='/'
        label='Home'
        icon={<HomeIcon className={iconClassName} />}
      />
      <BottomNavigationAction
        value='/profile'
        label='Profile'
        icon={<UserCircleIcon className={iconClassName} />}
      />
      <BottomNavigationAction
        value='/insights'
        label='Insights'
        icon={<LightBulbIcon className={iconClassName} />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;
