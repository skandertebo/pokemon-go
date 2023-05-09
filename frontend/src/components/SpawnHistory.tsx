import React from 'react';
import { RiCopperCoinLine } from 'react-icons/ri';
import { MdCatchingPokemon } from 'react-icons/md';
import CaptureBody from '../types/CaptureBody';
import { apiBaseUrl } from '../config';
import defaultPokemonImage from '../assets/images/eevee.png';
import shoudDisplayDefaultImage from '../utils/shouldDisplayDefaultImage';

export default function SpawnHistory({ capture }: { capture: CaptureBody }) {
  return (
    <div className='w-[calc(100%-25px)] sm:w-fit h-fit min-h-[8rem] px-2 py-1 relative border-b-[1px] border-primary mx-auto  '>
      <img 
        src={
          shoudDisplayDefaultImage(capture.pokemon.image)
            ? defaultPokemonImage
            : apiBaseUrl + '/public/image/' + capture.pokemon.image
        }
        alt='pokemon'
        className='w-1/3 h-auto sm:w-36 inline-block'
      />
      <div className='w-2/3 sm:w-56 h-full inline-block pl-4'>
        <div className='h-full flex flex-col justify-arround absolute top-[15%]'>
          <div className='text-2xl text-primary font-medium mb-2'>
            {capture.pokemon.name}
          </div>
          <div className=''>
            <RiCopperCoinLine className='inline-block' />
            <p className='w-fit inline-block'>
              score: {capture.pokemon.baseScore}
            </p>
          </div>
          <div className=''>
            <MdCatchingPokemon className='inline-block' />
            <p className='w-fit inline-block text-m'>
              captured: {capture.captureDate.split(' ')[0]}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
