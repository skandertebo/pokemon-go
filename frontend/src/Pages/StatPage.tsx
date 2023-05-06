import React from "react";
import SpawnHistory from "../components/SpawnHistory";
import ScoreComponent from "../components/ScoreComponent";
import {useState,useEffect} from 'react';
import axios from "axios";
import { apiBaseUrl } from "../config";
import { useAppContext } from '../context/AppContext';
import { useAuthContext } from '../context/AuthContext';
import { UseLoginReturnType } from "../types";
import PokemonProgress from "../components/PokemonProgress";

export default function StatPage() {
    const [left,setLeft] = useState('all');
    const [right,setRight] = useState('month');
    const [middle,setMiddle] = useState('week');
    const { token, user } = useAuthContext() as UseLoginReturnType;
    const { makeNotification } = useAppContext();
    const [spans,setSpans] = useState(null); //this is the data you need to fetch from the backend
    let score = user?.score;
    async function fetchData( pagination: string) {
        try{
            const res = await axios.get(apiBaseUrl + "/"+pagination,//complete this url
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            );
            setSpans(res.data); //set the data you fetched from the backend here
        }
        catch(e){
            console.error(e);
            makeNotification({
                message: 'Error fetching spans!',
                type: 'error',
                duration: 4000
            });
        }
    }
    async function changePagination(pag: string) {
        //dear coworker here you can fetch your data using the pagination (pag parameter)
        setSpans(null);
        fetchData(pag);
    }
    useEffect(() => {
        fetchData('week');
    }, []);
    //feel free to change any of the code above
    if(spans === null){
        return (
            <PokemonProgress />
        );
    }else {
    return (
        <div className="w-full min-h-screen  bg-third text-sans mb-16">
            <h1 className="text-3xl text-white font-semibold font-sans text-center w-full pt-8 ">
                Statistics
            </h1>
            {score && <ScoreComponent score={score}/>}
            <div className="bg-secondary rounded-xl w-full md:w-1/2 mx-auto">
                <h1 className="text-2xl text-primary text-center w-full py-6 ">
                    Spawn History
                </h1>
                <div className="w-full h-12 flex flex-row justify-around ">
                    <h1 className="text-lg text-primary opacity-60 cursor-pointer"
                    onClick={() => {
                        const temp = left;
                        setLeft(middle);
                        setMiddle(temp);
                        changePagination(temp);
                    }}
                    >{left}</h1>
                    <h1 className="text-3xl text-primary font-semibold drop-shadow-lg translate-y-2">{middle}</h1>
                    <h1 className="text-lg text-primary opacity-60 cursor-pointer"
                    onClick={() => {
                        const temp = right;
                        setRight(middle);
                        setMiddle(temp);
                        changePagination(temp);
                    }}
                    >{right}</h1>
                </div>
                {//dear coworker feel free to change the code below to satisfy your typescript needs
                spans && spans.map((span,index) => (
                    <SpawnHistory capture={span} key={index}/> 
                ))
                }
            </div>
        </div>
    );
}
}