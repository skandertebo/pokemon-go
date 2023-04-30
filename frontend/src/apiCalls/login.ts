export async function loginUser(data : loginBody) {
    const response =await fetch('http://localhost:8000/api/login',{
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
        throw new Error('Failed to login')
    }
}

export type loginBody = {
    email: string,
    password: string
}