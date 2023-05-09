import React, { useEffect, useState } from 'react';
import User from '../types/User';
import Player from '../components/Player';
import useLeaderboard from '../hooks/useLeaderboard';
import { useAuthContext } from '../context/AuthContext';
import FirstPlace from '../components/PodiumComponents/FirstPlace';
import SecondPlace from '../components/PodiumComponents/SecondPlace';
import ThirdPlace from '../components/PodiumComponents/ThirdPlace';
import PokemonProgress from '../components/PokemonProgress';

function Leaderboard() {
  const { token, user } = useAuthContext() as {
    token: string;
    user: User;
  };
  const players = useLeaderboard(token);

  if (!players) {
    return <PokemonProgress/>;
  }

  return (
    <div className='flex h-screen w-screen bg-background flex-col mb-16 '>
      <div className='flex h-96 flex-none flex-col items-center justify-between text-fourth bg-third md:h-[450px]'>
        <div className='h-1/5 text-white font-black text-3xl mt-3'>
          Leaderboard
        </div>
        <div className='flex flex-row content-center items-end  text-first'>
          <SecondPlace player={players.length > 1 ? players[1] : null} />
          <FirstPlace player={players.length > 0 ? players[0] : null} />
          <ThirdPlace player={players.length > 2 ? players[2] : null} />
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
