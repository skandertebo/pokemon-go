import { Navigate, useOutlet } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import React, { createContext, useContext, useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import MenuPage from '../pages/MenuPage';

const isShowingMenuContext = createContext<
  { isShowing: boolean; toggleIsShowing: () => void } | undefined
>(undefined);
export const useIsShowingMenu = () => useContext(isShowingMenuContext);

const MainLayout: React.FC = () => {
  const outlet = useOutlet();
  const { token } = useAuthContext()!;
  const [isShowingMenu, setIsShowingMenu] = useState<boolean>(false);

  if (!token) return <Navigate to='/login' />;

  return (
    <isShowingMenuContext.Provider
      value={{
        isShowing: isShowingMenu,
        toggleIsShowing: () => setIsShowingMenu((prev) => !prev)
      }}
    >
      <div className='bg-white w-screen'>
        {isShowingMenu && <MenuPage />}
        {outlet}
        <BottomNav />
      </div>
    </isShowingMenuContext.Provider>
  );
};

export default MainLayout;
