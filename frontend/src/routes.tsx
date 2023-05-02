import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import MainLayout from './Layouts/MainLayout';
import ProfilePage from './Pages/ProfilePage';
import CapturePage from './Pages/CapturePage';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Leaderboard from './Pages/Leaderboard';
import MainPage from './Pages/MainPage';
import PokemonPage from './Pages/PokemonPage';
import Pokemon from './types/Pokemon';

const bulbasaur : Pokemon = {
  id: 2,
  name: 'Bulbasaur',
  image: './src/assets/images/bulbasaur.png',
  score: 89,
  power: 100,
  spawn: 100,
  background: './src/assets/images/backgroundgreen.jpg',
  description: 'Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun\'s rays, the seed grows progressively larger.'
}

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
      },
      {
        path: '/pokemon/:id',
        element: <PokemonPage pokemon={bulbasaur} />
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
