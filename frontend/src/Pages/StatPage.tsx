import React, { useEffect } from "react";
import SpawnHistory from "../components/SpawnHistory";
import ScoreComponent from "../components/ScoreComponent";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function StatPage() {
    const { token } = useAuthContext()!;
    const navigate = useNavigate();
    useEffect(
        ()=>{
            if (!token){
                navigate('/login');
            }
    },[])

    return (
        <div className="w-screen bg-third text-sans">
            <h1 className="text-2xl text-white text-center w-full pt-8 ">
                Statistics
            </h1>
            <ScoreComponent />
            <div className="bg-secondary rounded-xl">
                <SpawnHistory />
                <SpawnHistory />
                <SpawnHistory />
                <SpawnHistory />
            </div>
        </div>
    );
}