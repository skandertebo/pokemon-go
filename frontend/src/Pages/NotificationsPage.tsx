import React, { useEffect } from 'react';
import NotificationComponent from '../components/NotificationComponent';
import { Notification } from '../types/Notification';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import useLastNotificationCheck from '../hooks/useLastNotificationCheck';

export default function NotificationsPage() {
  const { backendNotifications, setBackendNotifications } = useAppContext();
  const { token, user } = useAuthContext()!;
  const [_, setLastNotificationCheck] = useLastNotificationCheck();
  useEffect(() => {
    setLastNotificationCheck(Date.now());
    if (backendNotifications.some((e) => !e.isRead)) {
      const body = {
        user: {
          id: user!.id
        },
        notifications: backendNotifications
          .filter((e) => !e.isRead)
          .map((e) => e.id)
      };
      axios
        .post(apiBaseUrl + '/notification/readMany', body, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        .then((_) => {
          setBackendNotifications(
            backendNotifications.map((e) => ({ ...e, isRead: true }))
          );
        });
    }
  }, [backendNotifications]);

  return (
    <div className='bg-secondary min-h-screen py-4 pb-24'>
      <h1 className='w-full text-center text-4xl mb-4'>Notifications</h1>
      {backendNotifications.map((notification) => {
        return (
          <NotificationComponent
            notification={notification}
            key={notification.id}
          />
        );
      })}
    </div>
  );
}
