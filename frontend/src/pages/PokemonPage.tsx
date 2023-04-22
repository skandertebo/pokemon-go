import React from 'react';
import { RiCopperCoinLine } from 'react-icons/ri';
import { BsFire } from 'react-icons/bs';
import { MdCatchingPokemon } from 'react-icons/md';
import { useState } from 'react';
import './PokemonPage.css';
import Pokemon from '../types/Pokemon';

export default function PokemonPage({ pokemon }: { pokemon: Pokemon }) {
  return (
    <div className='bg-primary w-full h-screen '>
      <div className='w-full h-64 relative'>
        <img
          src={pokemon.image}
          alt='pokemon'
          className='w-40 m-auto absolute  bottom-0 left-[calc((100%-160px)/2)] animate-[bounce_4s_ease-in-out_infinite]'
        />
      </div>
      <div className='bg-third h-[calc(100%-256px)] rounded-2xl p-4'>
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
        <p className='w-full text-center mb-4'>
          <MdCatchingPokemon className='text-2xl inline relative top-[-1px] right-1 text-primary' />
          Spawn: {pokemon.spawn}
        </p>
        <p className='text-left w-64 mx-auto'>
          <span className='text-primary text-xl'>Description:</span>
          {pokemon.description}
        </p>
      </div>
    </div>
  );
}
