import { createContext, PropsWithChildren, useContext } from 'react';
import useLogin from '../hooks/useLogin';
import { AuthContextType, AuthenticationStates } from '../types';
import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import PokemonProgress from '../components/PokemonProgress';

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children
}) => {
  const { authentication, setToken, user, token, setUser } = useLogin();
  if (authentication === AuthenticationStates.VERIFYING_AUTH) {
    return (
      <Backdrop open={true}>
        <PokemonProgress />
      </Backdrop>
    );
  }
  return (
    <AuthContext.Provider
      value={{ authentication, setToken, user, token, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
