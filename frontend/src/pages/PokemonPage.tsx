import React from 'react';
import PokemonComponent from '../components/PokemonComponent';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import User from '../types/User';
import PokemonProgress from '../components/PokemonProgress';
import {BsArrowLeft} from 'react-icons/bs';

export default function PokemonPage() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const { token, user } = useAuthContext() as {
    token: string;
    user: User;
  };
  const { makeNotification } = useAppContext();

  useEffect(() => {
    async function fetchData() {
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
      }
    }
    fetchData();
  }, []);
  if(!pokemon) {
    return <PokemonProgress />;
  }
  return (
    <div className='relative'>
      {pokemon && <PokemonComponent pokemon={pokemon} />}
      <div>
        <BsArrowLeft className='absolute top-0 left-0 text-4xl text-primary mt-4 ml-4' onClick={() => window.history.back()}/>
      </div>
    </div>
  );
}
