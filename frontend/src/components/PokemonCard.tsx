import React from 'react';
import './PokemonCard.css';
import { useState, useEffect } from 'react';
import { RiCopperCoinLine } from 'react-icons/ri';
import { BsFire } from 'react-icons/bs';
import { MdCatchingPokemon } from 'react-icons/md';
import Pokemon from '../types/Pokemon';
import { useNavigate } from 'react-router-dom';
import getBackground from '../utils/getBackground';
import { apiBaseUrl } from '../config';

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const background = getBackground({ pokemon });
  const spawned = 1;
  const [image, setImage] = useState('/images/card.jpg');
  const [isRotated, setIsRotated] = useState(false);
  const [showPokemon, setShowPokemon] = useState(' hidden');
  const [rotate, setRotate] = useState('cursor-pointer');
  const navigate = useNavigate();
  const delayedExecution = () => {
    setImage('/images/cardface.png');
    setIsRotated(true);
    setShowPokemon('');
  };
  const handelRotation = () => {
    if (!isRotated) {
      setRotate('pokemoncard cursor-pointer');
      setTimeout(delayedExecution, 340);
    } else {
      navigate('/pokemon/' + pokemon.id);
    }
  };
  useEffect(() => {
    if (!spawned) {
      console.log('not spawned');
      setImage('/images/cardface.png');
      setIsRotated(true);
      setRotate('pokemoncard-notransition opacity-50');
      setShowPokemon('');
    }
  }, [spawned]);
  return (
    <div
      className={
        'w-44 relative block shrink-0 flex-item flex-1 sm:flex-none ' + rotate
      }
      onClick={handelRotation}
    >
      <img
        src={background}
        alt='background'
        className='w-full h-48 absolute top-8 z-0'
        id='background'
      />
      <img src={image} alt='card background' className='w-full z-1 absolute' />
      <img
        src={apiBaseUrl + '/public/image/' + pokemon.image}
        alt='eevee'
        id='pokemon'
        className={'w-32 absolute top-8 right-6 z-20 rotate-data' + showPokemon}
      />
      <div
        className={
          'absolute block top-[183px] right-5 w-[139px] z-20 rotate-data ' +
          showPokemon
        }
      >
        <h1 className=' text-2xl w-full text-center'>{pokemon.name}</h1>
      </div>
      <div
        className={
          ' absolute top-[215px] right-14 w-28 h-16 bg-red z-30 rotate-data' +
          showPokemon
        }
        id='pokemon-data'
      >
        <div className='inline-block w-full h-1/2 relative top-4 -right-2'>
          <RiCopperCoinLine className='text-xl inline relative right-1' />
          <p title='score' className='inline relative right-1 top-[1px]'>
            Score: {pokemon.baseScore}
          </p>
        </div>
      </div>
    </div>
  );
}
