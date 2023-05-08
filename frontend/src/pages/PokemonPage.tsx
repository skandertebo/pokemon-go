import React from 'react';
import PokemonComponent from '../components/PokemonComponent';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { UseLoginReturnType } from '../types';
import User from '../types/User';

export default function PokemonPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const { token, user } = useAuthContext() as {
    token: string;
    user: User;
  };
  const { makeNotification } = useAppContext();
  const { enableWaiting, disableWaiting } = useAppContext();

  useEffect(() => {
    async function fetchData() {
      enableWaiting();
      try {
        const res = await axios.get(apiBaseUrl + '/pokemon/' + id, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPokemon(res.data);
      } catch (e) {
        console.error(e);
        makeNotification({
          message: 'Error fetching Pokemon!',
          type: 'error',
          duration: 4000
        });
      } finally {
        disableWaiting();
      }
    }
    fetchData();
  }, []);

  return <div>{pokemon && <PokemonComponent pokemon={pokemon} />}</div>;
}
