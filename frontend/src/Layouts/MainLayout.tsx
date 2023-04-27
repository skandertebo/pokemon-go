import { useOutlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import React from 'react';

const MainLayout: React.FC = () => {
  const outlet = useOutlet();
  return (
    <div className='bg-white w-screen'>
      {outlet}
      <BottomNav />
    </div>
  );
};

export default MainLayout;
