"use client"
import Image from "next/image";
import { useState } from "react";
import Connect from "./components/Connect";
import UploadContract from "./components/UploadContract";


export default function Home() {
  const [signer, setSigner] = useState(undefined);

  return (
    <main className="flex min-h-screen flex-col items-center justify-content-center d-flex mt-5 mb-5">
    <div id="content" className="row bg-slate-500 rounded-md w-72 h-40">
    <div id="content-inner" className="col">
      <div className="text-center mb-5">
      <h1 id="title" className="fw-bold mt-2">Universal BlockChain App</h1>
      <p id="sub-title" className="mt-4 fw-bold"><span>A FrontEnd interface <br /> for Any Smart Contract </span></p>
      </div>
      {signer ? <UploadContract /> : <Connect setSigner = {setSigner}/> }
      </div>
    </div>
    </main>
);
}
