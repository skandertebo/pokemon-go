import { BellIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';

const NotificationIcon: React.FC<{
  notificationCount: number;
  className: string;
}> = ({ notificationCount, className }) => {
  return (
    <div className='relative'>
      <BellIcon className={className} />
      {notificationCount > 0 && (
        <div className='absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex justify-center items-center'>
          <Typography variant='h6' className='text-white'>
            {notificationCount > 99 ? '99+' : notificationCount}
          </Typography>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
