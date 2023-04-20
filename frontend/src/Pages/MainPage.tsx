import React from 'react';
import WebMap from '../components/Map';
import CaptureButton from '../components/CaptureButton';
import DebugModal from '../components/DebugModal';
import { useAppContext } from '../context/AppContext';
declare global {
  interface Window {
    initMap: () => void;
  }
}

const MainPage: React.FC = () => {
  const { geoLocationPosition } = useAppContext();

  return (
    <div className='w-screen h-screen sm:w-full flex flex-col gap-8 items-center'>
      {/*       <DebugModal
        data={{
          lat: geoLocationPosition?.coords?.latitude,
          long: geoLocationPosition?.coords?.longitude
        }}
      /> */}
      <div className='h-[60vh] w-full shadow-md rounde-md'>
        <WebMap />
      </div>
      <CaptureButton />
    </div>
  );
};

export default MainPage;
