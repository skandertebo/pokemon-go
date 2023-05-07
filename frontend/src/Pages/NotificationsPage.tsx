import React from 'react';
import NotificationComponent from '../components/NotificationComponent';
import UserNotification from '../types/UserNotification';

export default function NotificationsPage() {
  const notifications: UserNotification[] = [
    {
      content: 'You have been invited to a tournament',
      createdAt: Date.now(),
      isRead: false,
      id: 1
    },
    {
      content: 'You have been invited to a tournament',
      createdAt: Date.now(),
      isRead: false,
      id: 2
    },
    {
      content: 'You have been invited to a tournament',
      createdAt: Date.now(),
      isRead: false,
      id: 3
    },
    {
      content: 'You have been invited to a tournament',
      createdAt: Date.now(),
      isRead: false,
      id: 4
    }
  ];
  return (
    <div className='bg-secondary min-h-screen py-4'>
      <h1 className='w-full text-center text-4xl mb-4'>Notifications</h1>
      {notifications.map((notification) => {
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
