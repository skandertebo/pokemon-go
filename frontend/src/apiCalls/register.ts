import { apiBaseUrl } from "../config"

export async function registerUser(data : RegisterBody) {
    const response =await fetch(apiBaseUrl+'/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    return await response.json()
}

export type RegisterBody = {
    playerTag: string,
    email: string,
    password: string,
    image: string,
    role:"player"
}
function userState(): [any, any] {
    throw new Error("Function not implemented.")
}

