import React from 'react';

export default function ErrorPage() {
    return (
        <div className='w-screen h-screen bg-secondary '>
            <div className='w-[calc(100%-20px)] sm:w-[calc(100%-500px)] h-2/3 pt-[calc(50vh/2)] mx-auto sm:flex sm:flex-row sm:justify-between'>
                <div className='w-1/3 sm:w-96 inline-block relative top-20 sm:top-0'>
                    <h1 className='text-6xl w-full text-center sm:text-9xl text-third drop-shadow-lg font-black'>404</h1>
                    <div className='w-full bg-third p-2 rounded-lg'>
                        <h2 className='text-2xl sm:text-6xl text-white font-semibold'>Oups... Page not found</h2>
                    </div>
                </div>
                <img src="/images/cryingeevee2.png" alt="cryingeevee" className='w-2/3 md:w-96 inline-block' />
            </div>
        </div>
    );
    }