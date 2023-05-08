import React, { useEffect } from "react";
import SpawnHistory from "../components/SpawnHistory";
import ScoreComponent from "../components/ScoreComponent";
import { useAuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import User from "../types/User";


export default function StatPage() {
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