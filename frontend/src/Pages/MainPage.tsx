import React, { useState } from 'react';
import WebMap from '../components/Map';
import CaptureButton from '../components/CaptureButton';
import DebugModal from '../components/DebugModal';
import { useAppContext } from '../context/AppContext';
import CaptureCam from '../components/CaptureCam';
import { Spawn } from '../types/Spawn';
import { spawns } from '../assets/fakeData.ts/spawns';

declare global {
  interface Window {
    initMap: () => void;
  }
}

const MainPage: React.FC = () => {
  const { geoLocationPosition } = useAppContext();
  const [isCapturing, setIsCapturing] = useState<Spawn | null>(null);

  return (
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
      <CaptureButton onClick={() => setIsCapturing(spawns[0])} />
    </div>
  );
};

export default MainPage;
