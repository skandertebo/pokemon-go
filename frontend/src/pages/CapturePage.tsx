import React from 'react';
import PokemonCard from '../components/PokemonCard';
import pokemons from '../assets/pokemonsdata';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { UseLoginReturnType } from "../types";
import { useNavigate } from "react-router-dom";




export default function CapturePage() {
  const [pokemons, setPokemons] = useState([]);
  const { token, user } = useAuthContext() as UseLoginReturnType;
  const { makeNotification } = useAppContext();
  const { enableWaiting, disableWaiting } = useAppContext();
    const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      enableWaiting();
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
      } finally {
        disableWaiting();
      }
    }
    fetchData();
  }, []);

    useEffect(
        ()=>{
            if (!token){
                navigate('/login');
            }
    },[]);
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
  );}

