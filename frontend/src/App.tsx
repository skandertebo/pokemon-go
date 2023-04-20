import { useState } from 'react';
import './App.css';
import CapturePage from './pages/CapturePage';
import PokemonPage from './pages/PokemonPage';
import pokemons from "./assets/pokemonsdata";

function App() {

  return (
    <div className="App">
      <PokemonPage pokemon={pokemons[0]} />
    </div>
  );
}

export default App;
