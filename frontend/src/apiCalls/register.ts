export async function registerUser(data : registerBody) {
    const response =await fetch('http://localhost:8000/api/register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        mode: 'cors'
    })
    if(response.ok){
        return await response.json()
    }else{
        throw new Error('Failer to register')
    }
}

export type registerBody = {
    username: string,
    email: string,
    password: string,
    Image: string
}
