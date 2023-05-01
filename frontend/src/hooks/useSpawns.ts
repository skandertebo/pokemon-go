import { useEffect, useRef, useState } from 'react';
import { makeStreamEntities } from '../apiCalls/longPolling';
import { Spawn } from '../types/Spawn';
import { useAppContext } from '../context/AppContext';
import getDistance from '../utils/getDistance';
export default function useSpawns(
  token: string | null = null
): [Spawn[], Spawn | null] {
  const { geoLocationPosition, makeNotification } = useAppContext();
  const [spawns, setSpawns] = useState<Spawn[]>([]);
  const [nearbySpawn, setNearbySpawn] = useState<Spawn | null>(null);
  const streamSpawnsRef = useRef(makeStreamEntities<Spawn>(token));
  const isFirstRender = useRef(true);
  useEffect(() => {
    const uri = '/spawn/near';
    const [start, stop] = streamSpawnsRef.current;
    start(
      (newSpawns: Spawn[]) => {
        // compare newSpawns to spawns
        // if newSpawns is different, update spawns
        setSpawns((prev) => {
          if (newSpawns.length !== prev.length) {
            if (newSpawns.length > prev.length) {
              if (!isFirstRender.current) {
                setTimeout(() => {
                  makeNotification({
                    message: 'New spawns detected!',
                    type: 'info',
                    duration: 5000
                  });
                }, 0);
              }
            } else {
              if (!isFirstRender.current) {
                setTimeout(() => {
                  makeNotification({
                    message: 'Spawns removed!',
                    type: 'info',
                    duration: 5000
                  });
                }, 0);
              }
            }
            return newSpawns;
          } else {
            for (let i = 0; i < newSpawns.length; i++) {
              if (newSpawns[i].id !== prev[i].id) {
                if (!isFirstRender.current) {
                  setTimeout(() => {
                    makeNotification({
                      message: 'New spawns detected!',
                      type: 'info',
                      duration: 5000
                    });
                  }, 0);
                }
                return newSpawns;
              }
            }
          }
          return prev;
        });
      },
      uri,
      4000
    );

    isFirstRender.current = false;

    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    let findNearbySpawnDistance = Infinity;
    let findNearbySpawn: Spawn | null = null as Spawn | null;
    spawns.forEach((spawn) => {
      const distance = getDistance(
        spawn.latitude,
        spawn.longitude,
        geoLocationPosition!.coords.latitude,
        geoLocationPosition!.coords.longitude
      );
      if (distance < 100) {
        if (findNearbySpawnDistance > distance) {
          findNearbySpawnDistance = distance;
          findNearbySpawn = spawn;
        }
      }
    });
    if (findNearbySpawn && findNearbySpawn.id !== nearbySpawn?.id) {
      setNearbySpawn(findNearbySpawn);
    }
  }, [spawns, geoLocationPosition]);

  return [spawns, nearbySpawn];
}
