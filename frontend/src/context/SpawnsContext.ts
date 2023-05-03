import { createContext, useContext } from 'react';
import { Spawn } from '../types/Spawn';

export const spawnsContext = createContext<Spawn[]>([]);

export const useSpawnsContext = () => useContext(spawnsContext);
