import React from 'react';
import { RiCopperCoinLine } from 'react-icons/ri';
import { BsFire } from 'react-icons/bs';
import { MdCatchingPokemon } from 'react-icons/md';
import { useState } from 'react';
import Pokemon from '../types/Pokemon';

export default function PokemonComponent({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className='bg-third w-full h-screen'>
      <div className='w-full h-60 relative'>
        <img
          src={pokemon.image}
          alt='pokemon'
          className='w-40 m-auto absolute  bottom-0 left-[calc((100%-160px)/2)] animate-[bounce_4s_ease-in-out_infinite]'
        />
      </div>
      <div className='bg-secondary h-[calc(100%-256px)] rounded-2xl p-4'>
        <h1 className='text-2xl w-full text-center text-secondary'>
          {pokemon.name}
        </h1>
        <p className='w-full text-center mb-4'>
          <RiCopperCoinLine className='text-2xl inline relative right-1 text-primary' />
          Score: {pokemon.score}
        </p>
        <p className='w-full text-center mb-4'>
          <BsFire className='text-2xl inline relative top-[-1px] right-1 text-primary' />
          Power: {pokemon.power}
        </p>
        <p className='w-full text-center mb-2'>
          <MdCatchingPokemon className='text-2xl inline relative top-[-1px] right-1 text-primary' />
          Spawn: {pokemon.spawn}
        </p>
        <p className='text-left md:text-center w-64 md:w-auto mx-auto md:mx-32'>
          <span className='text-primary text-lg'>Description:</span>
          {pokemon.description}
        </p>
      </div>
    </div>
  );
}