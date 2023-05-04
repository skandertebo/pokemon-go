import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { addSpawn, SpawnBody } from "../apiCalls/addSpawn";
import { useAuthContext } from "../context/AuthContext";
import User from "../types/User";
import { Navigate } from "react-router-dom";
import { getPokemons } from "../apiCalls/getPokemons";
import Pokemon from "../types/Pokemon";
import { useAppContext } from "../context/AppContext";

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
        }  catch (error) {
            console.error(error);
        }
    };

    if (user.role!='admin'){
        <Navigate
        to={'/'}
       />
    }
    if (!token){
        <Navigate
        to={'/login'}
        />
    }
    if(!pokemons){
        return <div>Loading...</div>
    }
    return(
        <form className='text-center max-w-screen-md w-full m-auto p-5 ' onSubmit={handleSubmit}>
            <div className='m-4 '>
                <select className=' text-primary w-full h-12 px-2.5 rounded-md border-solid border-2  lg:w-[400px]' name='pokemonId' id='select' placeholder='Select Pokemon' onChange={handleInputChange} >
                    <option value=''>Select Pokemon</option>
                    {pokemons.map((pokemon) => (
                        <option value={pokemon.id} key={pokemon.id} className="text-primary">{pokemon.name}</option>
                    ))}
                </select>
            </div>
            <div className='m-4 '>
                <input className='w-full  text-primary h-12 px-2.5 rounded-md border-solid border-2  lg:w-[400px]' type='text' name='longitude' id='longitude' placeholder='Enter Longitude' onChange={handleInputChange} value={spawnData.longitude}/>
            </div>
            <div className='m-4 '>    
               <input className='w-full h-12 px-2.5  text-primary rounded-md border-solid border-2  lg:w-[400px]' type='text' name='latitude' id='latitude' placeholder='Enter Latitude' onChange={handleInputChange} value={spawnData.latitude}/>
            </div>
            <div className='m-4 '>    
               <input className='w-full h-12 px-2.5  text-primary rounded-md border-solid border-2  lg:w-[400px]' type='text' name='radius' id='radius' placeholder='Enter Radius' onChange={handleInputChange} value={spawnData.radius}/>
            </div>
            <div className='m-4 '>
                <Button className="bg-third w-3/4 h-12 rounded-md font-bold text-primary md:w-[300px] lg:w-[300px]" type='submit'>Add Spawn</Button>
            </div>
        </form>
    )
}

export default Dashboard;