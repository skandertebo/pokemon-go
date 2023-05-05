import React from "react";
import SpawnHistory from "../components/SpawnHistory";
import ScoreComponent from "../components/ScoreComponent";


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