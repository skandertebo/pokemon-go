import React from "react";
import Pokemon from "../types/Pokemon";

export default function getBackground({pokemon}: {pokemon: Pokemon}): string{
    if(pokemon.name.toLowerCase() === 'eevee'){
        return '/images/backgroundpink.jpg';
    }else if(pokemon.name.toLowerCase() ==='bulbasaur'){
        return '/images/backgroundgreen.jpg';
    }else if(pokemon.name.toLowerCase() ==='charizard'){
        return '/images/backgroundred.avif';
    }else{
        return '/images/backgroundbeige.jpg';
    }
}
