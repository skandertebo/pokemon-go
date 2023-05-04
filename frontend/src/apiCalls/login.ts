import { useState } from "react";
import { apiBaseUrl } from "../config"
import { LoginBody } from "../types/LoginBody";

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
