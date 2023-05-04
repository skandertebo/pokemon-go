import React from "react";
import {RiCopperCoinLine} from 'react-icons/ri';
import {MdCatchingPokemon} from 'react-icons/md';


export default function SpawnHistory() {
    return (
        <div className="w-full h-fit px-2 border ">
            <img src="./src/assets/images/eevee.png" alt="pokemon" className=" w-1/3 h-auto md:w-36 inline-block" />
            <div className="w-2/3 h-full inline-block pl-4">
                <div className="h-full flex flex-col justify-arround">
                    <div className="text-xl text-primary">eevee</div>
                    <div className="" > 
                        <RiCopperCoinLine />
                        <p>score</p>
                    </div>
                    <div className="">
                        <MdCatchingPokemon />
                        <p>spawned in 10/20/1200</p>
                    </div>
                </div>
            </div>
        </div>
    );
}