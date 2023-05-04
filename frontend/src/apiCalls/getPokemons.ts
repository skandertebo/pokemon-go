import { apiBaseUrl } from "../config";

export async function getPokemons(){
    const response= await fetch(apiBaseUrl+'/pokemon',{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('token')
        },
    })
    return await response.json()
}