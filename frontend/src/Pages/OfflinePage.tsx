import { ArrowPathIcon } from '@heroicons/react/24/solid';
import React from 'react';

export default function OfflinePage() {
  return (
    <div className='w-screen h-screen bg-secondary flex flex-col items-center justify-evenly'>
      <div className='flex flex-col gap-2 items-center'>
        <img
          src='/images/cryingeevee2.png'
          alt='cryingeevee'
          className='w-2/3 md:w-[300px]'
        />
        <div className='flex flex-col gap-2'>
          <h1 className='text-6xl w-full text-center text-third drop-shadow-lg font-black'>
            Oups
          </h1>
          <div className='w-full bg-third p-2 rounded-lg'>
            <h2 className='text-2xl sm:text-4xl text-white font-semibold text-center'>
              You appear to be offline
            </h2>
          </div>
        </div>
      </div>
      <div
        className='flex gap-4 text-center items-center'
        role='button'
        onClick={window.location.reload}
      >
        <h1 className='text-[2em]'>Refresh</h1>
        <ArrowPathIcon className='w-6 h-6' />
      </div>
    </div>
  );
}
