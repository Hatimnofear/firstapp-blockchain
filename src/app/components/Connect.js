"use client"
import Web3 from "web3";
import { ethers } from "ethers";
import { useState } from "react";


export default function Connect({ setSigner }) {
    const [error, setError] = useState(undefined); 


    const connect = async () => {
        if (!window.ethereum) {
            setError("You need to Install MetaMask before using this App ");
            return;
        }
        const provider = new ethers.BrowserProvider(window.ethereum);
        try {
        const signer = await provider.getSigner();
        setSigner(signer);
        } catch {
            setError ("You Need to Allow MetaMast to Connect this page");
        }

     };
    return (
        <div className="text-center">
            <button className="bg-teal-300 rounded-md w-28 btn btn-primary btn-lg mt-1" onClick={connect} >Connect</button>
            {error && <div className="alert alert-danger mt-3 mb-0"><i class="bi bi-exclamation-triangle-fill"></i>{error}</div>}
        </div>
    )    
}