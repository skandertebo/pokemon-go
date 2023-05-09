import {
  ArrowLeftIcon,
  ArrowLeftOnRectangleIcon,
  LifebuoyIcon,
  LightBulbIcon,
  UserIcon
} from '@heroicons/react/24/solid';
import { useIsShowingMenu } from '../Layouts/MainLayout';
import { Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export default function MenuPage(): JSX.Element {
  const { isShowing, toggleIsShowing } = useIsShowingMenu()!;
  const iconClassName = 'h-8 w-8 cursor-pointer text-primary';
  const pageRef = useRef<HTMLDivElement>(null);
  const { setToken } = useAuthContext()!;
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // remove animation class after the animation is done
    const timeout = setTimeout(() => {
      document
        .querySelector('.scroll-up-animation')
        ?.classList.remove('scroll-up-animation');
    }, 500);

    return () => {
      document.body.style.overflow = 'auto';
      clearTimeout(timeout);
    };
  }, []);

  const routes = [
    {
      value: '/profile',
      label: 'Profile',
      icon: <UserIcon className={iconClassName} />
    },
    {
      value: '/pokedex',
      label: 'Pokedex',
      icon: <LifebuoyIcon className={iconClassName} />
    },
    {
      value: '/insights',
      label: 'Insights',
      icon: <LightBulbIcon className={iconClassName} />
    }
  ];

  return (
    <div
      ref={pageRef}
      className='fixed overflow-hidden flex flex-col items-center z-10 bg-white w-screen h-screen scroll-up-animation'
    >
      <header className='fixed flex justify-between items-center w-full p-4 bg-primary'>
        <ArrowLeftIcon
          className='h-8 w-8 text-white cursor-pointer'
          onClick={() => {
            pageRef.current?.classList.add('scroll-down-animation');
            setTimeout(() => {
              toggleIsShowing();
            }, 450);
          }}
        />
        <Typography variant='h6' className='text-white'>
          Menu
        </Typography>
      </header>
      <div className='flex flex-col p-8 py-24 w-full h-full gap-10'>
        {routes.map((route) => (
          <div key={route.value} className='flex items-center w-full gap-6'>
            {route.icon}
            <Link to={route.value} onClick={() => toggleIsShowing()}>
              <Typography variant='h5' className='ml-2'>
                {route.label}
              </Typography>
            </Link>
          </div>
        ))}
        <div
          className='flex items-center w-full gap-6'
          role='button'
          onClick={() => {
            toggleIsShowing();
            setToken(null);
          }}
        >
          <ArrowLeftOnRectangleIcon className={iconClassName} />
          <Typography variant='h5' className='ml-2'>
            Logout
          </Typography>
        </div>
      </div>
    </div>
  );
}
