import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from './Layouts/MainLayout';
import ProfilePage from './pages/ProfilePage';
import CapturePage from './pages/CapturePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import MainPage from './pages/MainPage';

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
        element: <CapturePage />
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />
      }
    ]
  },
  {
    path: '/',
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Register />
      }
    ]
  }
]);

export default routes;
