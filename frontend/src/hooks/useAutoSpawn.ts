import axios from 'axios';
import { useEffect } from 'react';
import { apiBaseUrl } from '../config';
import { useAuthContext } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
const spawnRate = 300000;
export default function useAutoSpawn() {
  const { token } = useAuthContext()!;
  const { geoLocationPosition } = useAppContext();
  useEffect(() => {
    const autoSpawn = setInterval(() => {
      axios.post(
        apiBaseUrl + '/spawn/auto',
        {
          longitude: geoLocationPosition?.coords.longitude,
          latitude: geoLocationPosition?.coords.latitude
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    }, spawnRate);
    return () => clearInterval(autoSpawn);
  }, []);
}
