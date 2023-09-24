"use client";
import { useRouter } from 'next/navigation';
import React from 'react'

export default function Alert() {
    const navigate = useRouter()

    
    return (
        <div className="alert shadow-lg mb-6 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <div>
                <h3 className="font-bold">¡No hay un periodo definido!</h3>
                <div className="text-xs">El periodo anterior ha concluido, debe establecer uno nuevo para este semestre</div>
            </div>
            <button className="btn btn-sm" onClick={() => {navigate.back()}}>Ir a calendario</button>
        </div>
    )
}

