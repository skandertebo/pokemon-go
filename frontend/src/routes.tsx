import { createBrowserRouter } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import React from 'react';
import MainLayout from './Layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';

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
        element: <div>TODO</div>
      },
      {
        path: '/insights',
        element: <div>TODO</div>
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
        path: 'register',
        element: <Register />
      }
    ]
  }
]);

export default routes;
