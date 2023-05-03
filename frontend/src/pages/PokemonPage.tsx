import React from "react";
import PokemonComponent from "../components/PokemonComponent";
import pokemons from "../assets/pokemonsdata";


export default function PokemonPage() {
  return (
    <div>
      <PokemonComponent pokemon= {pokemons[0]}/>
    </div>
  );
}
