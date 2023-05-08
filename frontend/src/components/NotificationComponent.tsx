import React from 'react';
import calculateTimeDifference from '../utils/calculateTimeDifference';
import { useAuthContext } from '../context/AuthContext';
import { UseLoginReturnType } from '../types';
import { useEffect, useState } from 'react';
import { Notification } from '../types/Notification';

export default function NotificationComponent({
  notification
}: {
  notification: Notification;
}) {
  const { user } = useAuthContext() as UseLoginReturnType;
  const userTag = user?.playerTag;
  const notificationDate = new Date(notification.date);
  console.log(notificationDate);
  const [background, setbackground] = useState(' bg-blue-gray-200');
  const [hide, sethide] = useState('');
  useEffect(() => {
    if (notification.isRead === true) {
      setbackground(' bg-blue-gray-100');
      sethide(' hidden');
    }
  }, []);

  return (
    <div
      className={
        'mt-4 rounded-xl mx-1 md:mx-44 p-2 drop-shadow-lg relative' + background
      }
    >
      <div
        className={
          'w-3 h-3 absolute -top-[2px] -right-[2px] bg-third rounded-full' +
          hide
        }
      ></div>
      <div className=''>
        <img
          src='/images/pokeball.png'
          alt='pokeball'
          className='w-6 h-6 inline-block -mt-1'
        />
        <div className='w-[calc(100%-24px)] inline-block '>
          <div className='flex w-full flex-row justify-between'>
            <h1 className='inline-block w-fit pl-2 text-xl'>{userTag}</h1>
            <p className='w-fit inline-block pr-2'>
              {calculateTimeDifference(notificationDate)}
            </p>
          </div>
        </div>
      </div>
      <p className='mx-1 text-sm'>{notification.contenu}</p>
    </div>
  );
}
