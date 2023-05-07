import React from 'react';
import NotificationComponent from '../components/NotificationComponent';

export default function NotificationsPage() {
    return (
        <div className='bg-secondary min-h-screen py-4'>
            <h1 className='w-full text-center text-4xl mb-4'>Notifications</h1>
            {
                // notifications.map((notification) => {
                //     return <NotificationComponent notification={notification} />
                // })
            }
        </div>
    )
}