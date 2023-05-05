import React from "react";


export default function PokemonProgress(){

    return(
        <div className="flex justify-center items-center w-screen h-screen bg-secondary">
            <img src="/images/pokeball.png" alt="pokeball" className="rounded-full h-28 w-28 animate-[spin_2s_ease-in-out_infinite]" />
        </div>
    );
}