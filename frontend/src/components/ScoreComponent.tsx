import React from 'react';
import { GiTrophyCup } from 'react-icons/gi';
import './PokemonCard.css';
import { useState, useEffect } from 'react';
import { RiCopperCoinLine } from 'react-icons/ri';

export default function ScoreComponent({
  score
}: {
  score: number | undefined;
}) {
  if (score === undefined) {
    score = 0;
  }
  const [score1, setScore1] = useState('');
  const [rotate1, setRotate1] = useState('');
  const [rotate2, setRotate2] = useState('');
  const [rotate3, setRotate3] = useState('');
  const [hide, setHide] = useState('');
  useEffect(() => {
    setTimeout(() => {
      setRotate1(' pokemoncard');
    }, 1000);
    setTimeout(() => {
      setRotate2(' pokemoncard');
    }, 2000);
    setTimeout(() => {
      setRotate3(' pokemoncard');
    }, 3000);
    setTimeout(() => {
      setScore1(score!.toString());
      setHide(' hidden');
    }, 4000);
  }, [score]);

  return (
    <div className='w-full h-20 mt-8 md:w-1/2 mx-auto '>
      <div className='w-full sm:w-96 h-full mx-auto relative'>
        <div className='inline-block text-5xl text-primary absolute left-[10%]'>
          <h1>Score:</h1>
        </div>
        <div className='w-fit inline-block absolute top-2 right-[16%]'>
          <div className={hide}>
            <RiCopperCoinLine
              className={
                'inline-block text-4xl text-primary font-semibold' + rotate1
              }
            />
            <RiCopperCoinLine
              className={
                'inline-block text-4xl text-primary font-semibold' + rotate2
              }
            />
            <RiCopperCoinLine
              className={
                'inline-block text-4xl text-primary font-semibold' + rotate3
              }
            />
          </div>
          <h1 className='text-4xl text-primary font-semibold text-center relative w-32'>
            {score1}
          </h1>
        </div>
      </div>
    </div>
  );
}
