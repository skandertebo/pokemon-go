import React from "react";
import PokemonCard from "../components/PokemonCard";
import pokemons from "../assets/pokemonsdata";
import BottomNav from "../components/BottomNav";

export default function CapturePage() {
    return (
        <>
        <div className="bg-secondary pt-4 w-screen md:h-screen">
            <h1 className="text-center w-full text-4xl text-primary mb-12 relative z-10">
                Pokedex
            </h1>
            <div className="w-44 sm:w-full h-[1300px] sm:h-96 flex flex-col sm:flex-row justify-between sm:justify-evenly mx-auto mt-16 mb-12">
                {pokemons.map((pokemon) => (
                    <PokemonCard pokemon={pokemon} key={pokemon.id} />
                ))}
            </div>
        </div>
        </>
    );
    }