import React from 'react';
import SpawnHistory from '../components/SpawnHistory';
import ScoreComponent from '../components/ScoreComponent';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { UseLoginReturnType } from '../types';
import PokemonProgress from '../components/PokemonProgress';
import { Spawn } from '../types/Spawn';

export default function StatPage() {
  const [left, setLeft] = useState('all');
  const [right, setRight] = useState('month');
  const [middle, setMiddle] = useState('week');
  const { token, user } = useAuthContext() as UseLoginReturnType;
  const { makeNotification, enableWaiting, disableWaiting } = useAppContext();

  const [spawns, setSpawns] = useState<Spawn[] | null>(null); //this is the data you need to fetch from the backend
  let score = user!.score;
  async function fetchData(pagination: string) {
    try {
      const res = await axios.get(
        apiBaseUrl + '/spawn/history', //complete this url
        {
          params: {
            date: pagination
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSpawns(res.data); //set the data you fetched from the backend here
    } catch (e) {
      console.error(e);
      makeNotification({
        message: 'Error fetching spans!',
        type: 'error',
        duration: 4000
      });
    }
  }
  async function changePagination(pag: string) {
    enableWaiting();
    fetchData(pag).finally(() => {
      disableWaiting();
    });
  }
  useEffect(() => {
    fetchData('week');
  }, []);

  if (spawns === null) {
    return <PokemonProgress />;
  } else {
    return (
      <div className='w-full min-h-screen  bg-third text-sans pb-16'>
        <h1 className='text-3xl text-white font-semibold font-sans text-center w-full pt-8 '>
          Statistics
        </h1>
        <ScoreComponent score={score} />
        <div className='bg-secondary rounded-xl w-full md:w-1/2 mx-auto'>
          <h1 className='text-2xl text-primary text-center w-full py-6 '>
            Capture History
          </h1>
          <div className='w-full h-12 flex flex-row justify-around '>
            <h1
              className='text-lg text-primary opacity-60 cursor-pointer'
              onClick={() => {
                const temp = left;
                setLeft(middle);
                setMiddle(temp);
                changePagination(temp);
              }}
            >
              {left}
            </h1>
            <h1 className='text-3xl text-primary font-semibold drop-shadow-lg translate-y-2'>
              {middle}
            </h1>
            <h1
              className='text-lg text-primary opacity-60 cursor-pointer'
              onClick={() => {
                const temp = right;
                setRight(middle);
                setMiddle(temp);
                changePagination(temp);
              }}
            >
              {right}
            </h1>
          </div>
          {spawns.length === 0 ? (
            <h1 className='text-xl text-primary text-center w-full pt-20 h-[calc(100vh-300px)]'>
              No Pokemons Captured Yet
            </h1>
          ) : (
            spawns.map((spawn: any, index: number) => (
              <SpawnHistory
                capture={{
                  captureDate: spawn.captureDate.date,
                  pokemon: spawn.pokemon
                }}
                key={index}
              />
            ))
          )}
        </div>
      </div>
    );
  }
}
