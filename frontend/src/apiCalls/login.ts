import { useState } from "react";
import { apiBaseUrl } from "../config"

export async function loginUser(data : LoginBody) {
    const response =await fetch(apiBaseUrl+'/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    return await response.json();
}

export type LoginBody = {
    email: string,
    password: string
}