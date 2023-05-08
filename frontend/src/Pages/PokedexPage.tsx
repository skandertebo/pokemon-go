import React from 'react';
import PokemonCard from '../components/PokemonCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { UseLoginReturnType } from '../types';
import PokemonProgress from '../components/PokemonProgress';

export default function PokedexPage() {
  const [pokemons, setPokemons] = useState([]);
  const { token, user } = useAuthContext() as UseLoginReturnType;
  const { makeNotification } = useAppContext();
  const { enableWaiting, disableWaiting } = useAppContext();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(apiBaseUrl + '/pokemon', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPokemons(res.data.list);
      } catch (e) {
        console.error(e);
        makeNotification({
          message: 'Error fetching Pokemons!',
          type: 'error',
          duration: 4000
        });
      }
    }
    fetchData();
  }, []);
  if (pokemons.length === 0) {
    return <PokemonProgress />;
  } else {
    return (
      <>
        <div className='bg-secondary pt-4 w-screen min-h-screen overflow-y-auto overflow-x-hidden pb-32'>
          <h1 className='text-center w-full text-4xl text-primary mb-12 font-sans'>
            Pokedex
          </h1>
          <div className='flex overflow-hidden flex-col gap-[400px] items-center mt-16 pb-[300px]'>
            {pokemons.map((pokemon, index) => (
              <PokemonCard pokemon={pokemon} key={index} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
