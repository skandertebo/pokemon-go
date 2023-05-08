import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { addSpawn } from "../apiCalls/addSpawn";
import { useAuthContext } from "../context/AuthContext";
import User from "../types/User";
import { Navigate, useNavigate } from "react-router-dom";
import { getPokemons } from "../apiCalls/getPokemons";
import Pokemon from "../types/Pokemon";
import { useAppContext } from "../context/AppContext";
import { SpawnBody } from "../types/SpawnBody";

function Dashboard(){
    const [spawnData, setSpawnData] = useState<SpawnBody>({
        pokemonId: '',
        longitude: '',
        latitude: '',
        radius: '',
    });

    const {user,token}=useAuthContext()as {
        token: string;
        user: User;
    }

    const {makeNotification} = useAppContext();
    const [pokemons, setPokemons] = useState<Pokemon[] | undefined>(undefined);
    const [error, setError] = useState<string>('');
    const navigate = useNavigate();

    useEffect(()=>{
        async function fetchPokemons() {
            const pokemons = await getPokemons();
            setPokemons(pokemons.list);
        }
        fetchPokemons();
    },[])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setSpawnData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const spawn = await addSpawn(spawnData);
            if (spawn.error) {
                throw new Error(spawn.error.details[0].field+':'+spawn.error.details[0].message);
            }
            makeNotification({
                message:"spawn added successfully", 
                type:"success"
            });

        }  catch (error) {
            //@ts-ignore
            setError(error.message);
            console.error(error);
        }
    };
    if (!token){
        return(
        <Navigate
        to={'/login'}
        />)
    }

    if (user.playerTag){
        return(
        <Navigate
        to={'/'}
       />)
    }

    if(!pokemons){
        return <div>Loading...</div>
    }
    return(
        <form className='text-center max-w-screen-md w-full m-auto p-5 ' onSubmit={handleSubmit}>
            <div className='m-4 '>
                <select className=' text-primary w-full h-12 px-2.5 rounded-md border-solid border-2  lg:w-[400px]' name='pokemonId' id='select' placeholder='Select Pokemon' onChange={handleInputChange} required>
                    <option value=''>Select Pokemon</option>
                    {pokemons.map((pokemon) => (
                        <option value={pokemon.id} key={pokemon.id} className="text-primary">{pokemon.name}</option>
                    ))}
                </select>
            </div>
            <div className='m-4 '>
                <input className='w-full  text-primary h-12 px-2.5 rounded-md border-solid border-2  lg:w-[400px]' type='text' name='longitude' id='longitude' placeholder='Enter Longitude' onChange={handleInputChange} value={spawnData.longitude} required/>
            </div>
            <div className='m-4 '>    
               <input className='w-full h-12 px-2.5  text-primary rounded-md border-solid border-2  lg:w-[400px]' type='text' name='latitude' id='latitude' placeholder='Enter Latitude' onChange={handleInputChange} value={spawnData.latitude} required/>
            </div>
            <div className='m-4 '>    
               <input className='w-full h-12 px-2.5  text-primary rounded-md border-solid border-2  lg:w-[400px]' type='text' name='radius' id='radius' placeholder='Enter Radius' onChange={handleInputChange} value={spawnData.radius} required/>
            </div>
            <div className='m-4 '>
                <Button className="bg-third w-3/4 h-12 rounded-md font-bold text-primary md:w-[300px] lg:w-[300px]" type='submit'>Add Spawn</Button>
            </div>
            {error && <div>{error}</div>}
        </form>
    )
}

export default Dashboard;