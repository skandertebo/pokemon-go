import React, { useEffect, useState } from 'react';
import User from '../types/User';
import Player from '../components/Player';
import { FaCrown } from 'react-icons/fa';
import { useAppContext } from '../context/AppContext';
import useLeaderboard from '../hooks/useLeaderboard';
import { useAuthContext } from '../context/AuthContext';
import { apiBaseUrl } from '../config';

function Leaderboard() {
  const { token } = useAuthContext()!;
  const players = useLeaderboard(token);

  if (!players) {
    return <></>;
  }

  return (
    <div className='flex h-screen w-screen bg-background flex-col  '>
      <div className='flex h-96 flex-none flex-col items-center justify-between text-fourth bg-third md:h-[450px]'>
        <div className='h-1/5 text-white font-black text-3xl mt-3'>
          Leaderboard
        </div>
        <div className='flex flex-row content-center items-end  text-first'>
          <div
            className={`relative overflow-visible flex h-40 w-24 flex-col items-center rounded-tl-2xl rounded-bl-2xl ${
              players.length > 1 ? 'bg-primary' : 'bg-fourth'
            } md:w-32`}
          >
            {players.length > 1 ? (
              <img
                src={apiBaseUrl + '/public/image/' + players[1].image}
                className=' relative bottom-7 h-16 w-16 rounded-full border-4 border-[#C0C0C0] bg-white '
              />
            ) : (
              <div className=' relative bottom-7 h-16 w-16 rounded-full border-4 border-[#C0C0C0] bg-fourth ' />
            )}

            <p className='break-all  pl-1 pr-1  relative bottom-3 text-[#C0C0C0] font-black'>
              {players.length > 1 ? players[1].playerTag : ''}
            </p>
            <p className='text-md relative bottom-1'>
              {players.length > 1 ? players[1].score : ''}
            </p>
          </div>
          <div
            className={`relative overflow-visible flex h-48 w-28 flex-col items-center rounded-t-2xl ${
              players.length > 0 ? 'bg-[#003478]' : 'bg-fourth'
            }  md:w-36 `}
          >
            <FaCrown
              className='relative bottom-14 right-10 -rotate-45 h-12 w-12'
              fill='#FFD700'
            />
            {players.length > 0 ? (
              <img
                src={apiBaseUrl + '/public/image/' + players[0].image}
                className='relative bottom-20 h-20 w-20 rounded-full bg-black border-4 border-[#FFD700] '
              ></img>
            ) : (
              <div className='relative bottom-20 h-20 w-20 rounded-full bg-fourth border-4 border-[#FFD700] ' />
            )}
            <p className=' break-all  pl-1 pr-1 relative bottom-16 font-black text-lg text-[#FFD700] '>
              {players.length > 0 ? players[0].playerTag : ''}
            </p>
            <p className='relative bottom-14'>
              {players.length > 0 ? players[0].score : ''}
            </p>
          </div>
          <div
            className={`overflow-visible flex h-32 w-24 flex-col items-center rounded-tr-2xl rounded-br-2xl ${
              players.length > 2 ? 'bg-primary' : 'bg-fourth'
            }  md:w-32 `}
          >
            {players.length > 2 ? (
              <img
                src={apiBaseUrl + '/public/image/' + players[2].image}
                className='relative bottom-7 h-16 w-16 rounded-full bg-white border-4 border-[#CD7F32]'
              ></img>
            ) : (
              <div className='relative bottom-7 h-16 w-16 rounded-full bg-fourth border-4 border-[#CD7F32]' />
            )}
            <p className=' break-all  pl-1 pr-1  relative bottom-5 font-black text-sm text-[#CD7F32]'>
              {players.length > 2 ? players[2].playerTag : ''}
            </p>
            <p className=' relative bottom-3'>
              {players.length > 2 ? players[2].score : ''}
            </p>
          </div>
        </div>
        <div className='bg-secondary h-6 w-full  rounded-t-3xl'></div>
      </div>

      <div className=' bg-secondary flex flex-col flex-grow  items-center text-black'>
        {players.length > 3 ? (
          players.slice(3).map((player, index) => {
            return (
              <Player key={index} index={index + 4} player={player}></Player>
            );
          })
        ) : (
          <div className='text-2xl italic text-gray-600 mt-10 text-center'>
            No more players. Invite your friends If you like our game.
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
