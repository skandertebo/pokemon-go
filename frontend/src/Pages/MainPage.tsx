import React, { useState } from 'react';
import WebMap from '../components/Map';
import CaptureButton from '../components/CaptureButton';
import { useAppContext } from '../context/AppContext';
import CaptureCam from '../components/CaptureCam';
import { Spawn } from '../types/Spawn';
import { useAuthContext } from '../context/AuthContext';
import { UseLoginReturnType } from '../types';
import useSpawns from '../hooks/useSpawns';
import { spawnsContext } from '../context/SpawnsContext';
declare global {
  interface Window {
    initMap: () => void;
  }
}

const MainPage: React.FC = () => {
  const [isCapturing, setIsCapturing] = useState<Spawn | null>(null);
  const { token } = useAuthContext() as UseLoginReturnType;
  const [spawns, nearbySpawn] = useSpawns(token);
  return (
    <spawnsContext.Provider value={spawns}>
      <div className='w-screen h-screen sm:w-full flex flex-col gap-8 items-center'>
        <div className='h-[60vh] w-full shadow-md rounde-md'>
          <WebMap />
        </div>
        {isCapturing && (
          <CaptureCam
            spawn={isCapturing}
            captureAction={() => setIsCapturing(null)}
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
