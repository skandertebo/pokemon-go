import React, { useState, useCallback, useEffect } from 'react';
import WebMap from '../components/Map';
import CaptureButton from '../components/CaptureButton';
import { useAppContext } from '../context/AppContext';
import CaptureCam from '../components/CaptureCam';
import { Spawn } from '../types/Spawn';
import { useAuthContext } from '../context/AuthContext';
import { UseLoginReturnType } from '../types';
import useSpawns from '../hooks/useSpawns';
import { spawnsContext } from '../context/SpawnsContext';
import axios from 'axios';
import { apiBaseUrl } from '../config';
import { useNavigate } from 'react-router-dom';
declare global {
  interface Window {
    initMap: () => void;
  }
}

const MainPage: React.FC = () => {
  const [isCapturing, setIsCapturing] = useState<Spawn | null>(null);
  const { token, user } = useAuthContext() as UseLoginReturnType;
  const [spawns, nearbySpawn] = useSpawns(token);
  const { makeNotification } = useAppContext();
  const navigate = useNavigate();
  useEffect(
    ()=>{
    if (!token){
    navigate('/login');
  }
},[])
  
  const handleCapture = useCallback(async (spawn: Spawn) => {
    try {
      const res = await axios.post(
        apiBaseUrl + '/spawn/catch',
        {
          spawnId: spawn.id,
          playerId: user!.id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      makeNotification({
        message: 'Pokemon Captured!',
        type: 'success',
        duration: 4000
      });
    } catch (e) {
      console.error(e);
      makeNotification({
        message: 'Error Capturing Pokemon!',
        type: 'error',
        duration: 4000
      });
    } finally {
      setIsCapturing(null);
    }
  }, []);
  return (
    <spawnsContext.Provider value={spawns}>
      <div className='w-screen h-screen sm:w-full flex flex-col gap-8 items-center'>
        <div className='h-[60vh] w-full shadow-md rounde-md'>
          <WebMap />
        </div>
        {isCapturing && (
          <CaptureCam
            spawn={isCapturing}
            captureAction={(spawn: Spawn) => handleCapture(spawn)}
          />
        )}
        <CaptureButton
          disabled={!nearbySpawn}
          onClick={() => setIsCapturing(nearbySpawn)}
        />
      </div>
    </spawnsContext.Provider>
  );
};

export default MainPage;
