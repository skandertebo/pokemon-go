import React from "react";
import PokemonCard from "../components/PokemonCard";
import pokemons from "../assets/pokemonsdata";

export default function CapturePage() {
    return (
        <div className="py-8 h-fit sm:h-screen bg-primary bg-[url('https://freephonewallpapersformobile.files.wordpress.com/2020/08/umbreon-in-pokeball-lockscreen-mobile-wallpaper-hd.jpg?w=250')] bg-contain
        sm:bg-[url('https://c4.wallpaperflare.com/wallpaper/280/139/794/pokemon-background-desktop-wallpaper-preview.jpg')] sm:bg-cover">
        <h1 className="text-center w-full text-4xl text-secondary mb-12 relative z-10">
            Pokedex
        </h1>
            <div className="w-44 sm:w-full h-[1300px] sm:h-auto flex flex-col sm:flex-row justify-between sm:justify-evenly mx-auto mt-32 mb-32 relative z-20">
        {pokemons.map((pokemon) => (
            <PokemonCard pokemon={pokemon} key={pokemon.id} />
        ))}
        </div>
        <div className="w-full h-1/3 sm:h-1/4 fixed top-0 bg-primary z-0 "></div>
        <div className="w-full h-1/3 sm:h-2/4 fixed top-1/3 sm:top-1/4 bg-transparent z-0 "></div>
        <div className="w-full h-1/3 sm:h-1/4 fixed top-2/3 sm:top-3/4 bg-primary z-0 "></div>
        </div>
    );
    }