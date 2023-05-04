import { apiBaseUrl } from "../config"
import { SpawnBody } from "../types/SpawnBody";

export async function addSpawn(data : SpawnBody) {
    const body = {
            pokemonId: parseInt(data.pokemonId),
            latitude: parseFloat(data.latitude),
            longitude: parseFloat(data.longitude),
            radius: parseInt(data.radius)
        }
    const response =await fetch(apiBaseUrl+'/spawn',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token') 
        },
        body: JSON.stringify(body),
    });
    return await response.json()
}


