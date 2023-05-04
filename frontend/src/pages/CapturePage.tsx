import React from "react";
import PokemonCard from "../components/PokemonCard";
import pokemons from "../assets/pokemonsdata";
import { useEffect,useState } from "react";
import axios from "axios";
import { apiBaseUrl } from "../config";
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { UseLoginReturnType } from "../types";




export default function CapturePage() {
    const [pokemons, setPokemons] = useState([]);
    const { token, user } = useAuthContext() as UseLoginReturnType;
    const { makeNotification } = useAppContext();
    const { enableWaiting, disableWaiting } = useAppContext();
    useEffect(() => {
        async function fetchData() {
            enableWaiting();
            try{
                const res = await axios.get(apiBaseUrl + "/pokemon",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
                );
                setPokemons(res.data.list);
            }
            catch(e){
                console.error(e);
                makeNotification({
                    message: 'Error fetching Pokemons!',
                    type: 'error',
                    duration: 4000
                });
            }finally{
                disableWaiting();
            }
        }
        fetchData();
    }, []);
        

    return (
        <>
        <div className="bg-secondary pt-4 w-screen md:h-screen">
            <h1 className="text-center w-full text-4xl text-primary mb-12 relative z-10 font-sans">
                Pokedex
            </h1>
            <div className="w-44 sm:w-full h-[1300px] sm:h-96 flex flex-col sm:flex-row justify-between sm:justify-evenly mx-auto mt-16 mb-12">
                {pokemons.map((pokemon,index) => (
                    <PokemonCard pokemon={pokemon} key={index} />
                ))}
            </div>
        </div>
        </>
    );
    }