import { useEffect, useState } from 'react';
import { Spawn } from '../types/Spawn';
import { useAppContext } from '../context/AppContext';
import getDistance from '../utils/getDistance';
const maxDistance = 0.9;
export default function useNearbySpawn(
  spawns: Spawn[] | undefined
): Spawn | null {
  const [nearbySpawn, setNearbySpawn] = useState<Spawn | null>(null);
  const { geoLocationPosition } = useAppContext();

  useEffect(() => {
    let findNearbySpawnDistance = Infinity;
    let findNearbySpawn: Spawn | null = null as Spawn | null;
    if (!geoLocationPosition || !spawns) return;
    spawns.forEach((spawn) => {
      const distance = getDistance(
        spawn.latitude,
        spawn.longitude,
        geoLocationPosition!.coords.latitude,
        geoLocationPosition!.coords.longitude
      );
      if (distance < maxDistance) {
        if (findNearbySpawnDistance > distance) {
          findNearbySpawnDistance = distance;
          findNearbySpawn = spawn;
        }
      }
    });
    if (findNearbySpawn) {
      if (findNearbySpawn.id !== nearbySpawn?.id) {
        setNearbySpawn(findNearbySpawn);
      }
    } else {
      setNearbySpawn(null);
    }
  }, [spawns, geoLocationPosition]);

  return nearbySpawn;
}
