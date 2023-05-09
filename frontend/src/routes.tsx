import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import { lazy } from 'react';
/* import MainLayout from './Layouts/MainLayout';
import ProfilePage from './pages/ProfilePage';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboard from './pages/Leaderboard';
import MainPage from './pages/MainPage';
import DashboardPage from './pages/DashboardPage';
import PokemonPage from './pages/PokemonPage';
import StatPage from './pages/StatPage';
import ErrorPage from './pages/ErrorPage';
import PokedexPage from './pages/PokedexPage';
import NotificationsPage from './pages/NotificationsPage';
 */
const MainLayout = lazy(() => import('./Layouts/MainLayout'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const MainPage = lazy(() => import('./pages/MainPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const PokemonPage = lazy(() => import('./pages/PokemonPage'));
const StatPage = lazy(() => import('./pages/StatPage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const PokedexPage = lazy(() => import('./pages/PokedexPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));

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
        path: '/pokedex',
        element: <PokedexPage />
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
      },
      {
        path: '/notifications',
        element: <NotificationsPage />
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
