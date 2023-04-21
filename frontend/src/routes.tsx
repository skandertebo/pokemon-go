import { createBrowserRouter } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import React from 'react';
import MainLayout from './Layouts/MainLayout';
import ProfilePage from './pages/ProfilePage';
import Leaderboard from './Pages/Leaderboard';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      },
      {
        path: '/insights',
        element: <div>TODO</div>
      },
      {
        path: 'login',
        element: <div>TODO</div>
      },
      {
        path: 'signup',
        element: <div>TODO</div>
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />
      }
    ]
  }
]);

export default routes;
