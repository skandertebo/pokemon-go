import React from 'react';
import PokemonCard from '../components/PokemonCard';
import {BsFillTriangleFill} from 'react-icons/bs';
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
  const [hide, setHide] = useState('');
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
  useEffect(() => {
    setTimeout(() => {
      setHide(' hidden');
    }, 5000);
  }, []);
  if (pokemons.length === 0) {
    return <PokemonProgress />;
  } else {
    return (
      <>
        <div className='bg-secondary pt-4 w-screen min-h-screen overflow-y-auto overflow-x-hidden pb-32 relative'>
          <h1 className='text-center w-full text-4xl text-primary mb-12 font-sans'>
            Pokedex
          </h1>
          <div className={'w-full absolute top-[calc(100vh-200px)] right-4 flex flex-row justify-end z-30'+hide}>
                <div className='w-56 bg-third rounded-xl px-2 py-1 relative'>
                  <h1 className='text-2xl text-primary'>{user?.playerTag}</h1>
                  <p>
                    For more informations about a Pokemon click on it's card.
                  </p> 
                  <BsFillTriangleFill className='text-third text-2xl absolute -right-4 top-8 rotate-90' />
                </div>
                <img src="/images/rowlet.png" alt="rowlet" className='w-24 h-auto ml-4' />
          </div>
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
