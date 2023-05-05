import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from './Layouts/MainLayout';
import ProfilePage from './pages/ProfilePage';
import CapturePage from './pages/CapturePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import MainPage from './pages/MainPage';
import DashboardPage from './pages/DashboardPage';
import PokemonPage from './pages/PokemonPage';
import StatPage from './pages/StatPage';
import ErrorPage from './pages/ErrorPage';

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
        path: '/pokdex',
        element: <CapturePage /> // should be renamed to PokedexPage!
      },
      {
        path: '/leaderboard',
        element: <Leaderboard />
      },
      {
        path: '/pokemon/:id',
        element: <PokemonPage />
      },
      {
        path: '/insights',
        element: <StatPage />
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
  },
  {
    path: 'dashboard',
    element: <DashboardPage />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

export default routes;
