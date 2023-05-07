import { useEffect, useRef, useState } from 'react';
import { makeStreamEntities } from '../apiCalls/longPolling';
import User  from '../types/User';
import { useAppContext } from '../context/AppContext';

export default function useLeaderboard(
  token: string | null = null
): User[] | undefined {
  const { makeNotification } = useAppContext();
  const [leaderboard, setLeaderboard] = useState<User[] | undefined>(undefined);
  const streamPlayersRef = useRef(makeStreamEntities<User>(token));
  const isFirstRender = useRef(true);
  
  useEffect(() => {
    const uri = '/player/leaderboard';
    const [start, stop] = streamPlayersRef.current;
    start(
      (newPlayers: User[]) => {
        setLeaderboard((prev) => {
          if(!prev){
            return newPlayers;
          }
          if (newPlayers.length !== prev.length) {
              if (!isFirstRender.current) {
                setTimeout(() => {
                  makeNotification({
                    message: 'New players added to the leaderboard!',
                    type: 'info',
                    duration: 5000
                  });
                }, 0);
              }
            return newPlayers;
          }
          for(let i = 0; i < newPlayers.length; i++){
            if(newPlayers[i].id !== prev[i].id){
              return newPlayers;
            }
          }
          return prev;
        });
      },
      uri,
      10000
    );

    isFirstRender.current = false;

    return () => {
      stop();
    };
  }, []);


  return leaderboard;
}
