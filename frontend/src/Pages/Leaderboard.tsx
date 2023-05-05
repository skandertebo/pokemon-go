import React, { useEffect, useState } from 'react';
import User from '../types/User';
import Player from '../components/Player';
import { FaCrown } from 'react-icons/fa';

const users: Partial<User>[] = [
  {
    username: 'Fankoush',
    score: 10000,
    avatar: 'src/assets/react.svg'
  },
  {
    username: 'Player1',
    score: 10000,
    avatar: 'src/assets/react.svg'
  },
  {
    username: 'Player2',
    score: 10000,
    avatar: 'src/assets/react.svg'
  },
  {
    username: 'Player3',
    score: 10000,
    avatar: 'src/assets/react.svg'
  },
  {
    username: 'Player4',
    score: 10000,
    avatar: 'src/assets/react.svg'
  },
  {
    username: 'Player5',
    score: 10000,
    avatar: 'src/assets/react.svg'
  }
];

const Leaderboard = () => {
  const [players, setPlayers] = useState<Partial<User>[]>(users);
  useEffect(() => {
    // call api to get players
  }, []);

  return (
    <div className='flex h-screen w-screen bg-background flex-col  '>
      <div className='flex h-96 flex-none flex-col items-center justify-between text-fourth bg-third md:h-[450px]'>
        <div className='h-1/5 text-white font-black text-3xl mt-3'>
          Leaderboard
        </div>
        <div className='flex flex-row content-center items-end  text-first'>
          <div className='relative overflow-visible flex h-40 w-24 flex-col items-center rounded-tl-2xl rounded-bl-2xl bg-primary md:w-32'>
            <img
              src='https://127.0.0.1:8000/api/file/forWeb_6454ffcb54324.jpg'
              className=' relative bottom-7 h-16 w-16 rounded-full border-4 border-[#C0C0C0] bg-white '
            ></img>
            <p className='break-all  pl-1 pr-1  relative bottom-3 text-[#C0C0C0] font-black'>
              {players[1].username}
            </p>
            <p className='text-md relative bottom-1'>{players[1].score}</p>
          </div>
          <div className='relative overflow-visible flex h-48 w-28 flex-col items-center rounded-t-2xl bg-[#003478] md:w-36  '>
            <FaCrown
              className='relative bottom-14 right-10 -rotate-45 h-12 w-12'
              fill='#FFD700'
            />
            <img
              src={players[0].avatar}
              className='relative bottom-20 h-20 w-20 rounded-full bg-black border-4 border-[#FFD700] '
            ></img>
            <p className=' break-all  pl-1 pr-1 relative bottom-16 font-black text-lg text-[#FFD700] '>
              {players[0].username}
            </p>
            <p className='relative bottom-14'>{players[0].score}</p>
          </div>
          <div className='overflow-visible flex h-32 w-24 flex-col items-center rounded-tr-2xl rounded-br-2xl  bg-primary md:w-32 '>
            <img
              src={players[2].avatar}
              className='relative bottom-7 h-16 w-16 rounded-full bg-white border-4 border-[#CD7F32]'
            ></img>
            <p className=' break-all  pl-1 pr-1  relative bottom-5 font-black text-sm text-[#CD7F32]'>
              {players[2].username}
            </p>
            <p className=' relative bottom-3'>{players[2].score}</p>
          </div>
        </div>
        <div className='bg-secondary h-6 w-full  rounded-t-3xl'></div>
      </div>

      <div className=' bg-secondary flex flex-col flex-grow  items-center text-black'>
        {players.slice(3).map((player, index) => {
          return (
            <Player key={index} index={index + 4} player={player}></Player>
          );
        })}
      </div>
    </div>
  );
};

export default Leaderboard;
