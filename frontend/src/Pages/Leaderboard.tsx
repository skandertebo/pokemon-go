import React, { useEffect, useState } from 'react';
import User from '../types/User';
import Player from '../components/Player';
import { FaCrown } from 'react-icons/fa';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { UseLoginReturnType } from '../types';
import PokemonProgress from '../components/PokemonProgress';

const Leaderboard = () => {
  const [players, setPlayers] = useState<Partial<User>[]>();
  const { user, token } = useAuthContext() as UseLoginReturnType;
  const { makeNotification } = useAppContext();
  const [Page, setPage] = useState<number>(1);
  const [hasReachedLimit, setHasReachedLimit] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const limit = 6;
  async function getPlayers(page = 1, limit = 6) {
    try {
      const res = await axios.get(
        apiBaseUrl + `/player/leaderboard?page=${page}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (players) {
        setPlayers((prev) => [...prev, ...res.data]);
        setPage((prev) => ++prev);
      } else setPlayers(res.data);
      console.log(players);
      setIsLoaded(true);
      if (res.data.length < limit) setHasReachedLimit(true);
    } catch (e) {
      console.error(e);
      makeNotification({
        message: 'Error loading leaderboard',
        type: 'error',
        duration: 4000
      });
    }
  }

  useEffect(() => {
    getPlayers();
  }, []);

  if (!isLoaded) return <PokemonProgress />;
  else {
    return (
      <div className='flex h-screen w-screen bg-background flex-col overflow-auto mb-[50px]'>
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
                {players[1].playerTag}
              </p>
              <p className='text-md relative bottom-1'>{players[1].score}</p>
            </div>
            <div className='relative overflow-visible flex h-48 w-28 flex-col items-center rounded-t-2xl bg-[#003478] md:w-36  '>
              <FaCrown
                className='relative bottom-14 right-10 -rotate-45 h-12 w-12'
                fill='#FFD700'
              />
              <img
                src={players[0].image}
                className='relative bottom-20 h-20 w-20 rounded-full bg-black border-4 border-[#FFD700] '
              ></img>
              <p className=' break-all  pl-1 pr-1 relative bottom-16 font-black text-lg text-[#FFD700] '>
                {players[0].playerTag}
              </p>
              <p className='relative bottom-14'>{players[0].score}</p>
            </div>
            <div className='overflow-visible flex h-32 w-24 flex-col items-center rounded-tr-2xl rounded-br-2xl  bg-primary md:w-32 '>
              <img
                src={players[2].image}
                className='relative bottom-7 h-16 w-16 rounded-full bg-white border-4 border-[#CD7F32]'
              ></img>
              <p className=' break-all  pl-1 pr-1  relative bottom-5 font-black text-sm text-[#CD7F32]'>
                {players[2].playerTag}
              </p>
              <p className=' relative bottom-3'>{players[2].score}</p>
            </div>
          </div>
          <div className='bg-secondary h-6 w-full  rounded-t-3xl'></div>
        </div>

        <div className=' bg-secondary flex flex-col flex-grow  items-center text-black '>
          {players?.slice(3).map((player, index) => {
            return (
              <Player key={index} index={index + 4} player={player}></Player>
            );
          })}
          <div className='my-8 text-center'>
            <button
              disabled={hasReachedLimit}
              onClick={() => getPlayers(Page + 1, limit)}
              className={
                hasReachedLimit
                  ? 'text-primary text-lg opacity-50 '
                  : 'text-primary hover:underline text-lg  '
              }
            >
              Load more
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Leaderboard;
