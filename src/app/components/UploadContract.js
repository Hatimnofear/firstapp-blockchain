"use client"

import { useState} from "react";
import { Contracts } from "ethers";

export default function UploadContract ({ signer }) {
    const [abiString, setAbiString] = useState("");
    const [address, setAddress] = useState("");
    const [contractUpload, setContractUpload] = useState(false);

    const updateAbiString = data => {
        setAbiString(data.target.value.trim());
    }

    const buildUI = e => {
        e.preventDefault();
        let abiObj = JSON.parse(abiString);
        const Contract = new Contract(address, abiObj, signer);
        abiObj = abiObj.filter(element => element.type === "function")
        setAbi (abiObj);
        setContract(contract);
    }
    
    return (
        <>
        <h3 className="text-lg">Step 1 : update Contract Details </h3>
        <form onSubmit={buildUI}>
            <div className="mb-3">
                <label htmlFor="abi" className="form-label"> ABI </label>
                <textarea
                    name="abi"
                    className="form-control textarea mb-3"
                    rows={10}
                    cols={60}
                    placeholder="Copy Paste the Abi of the Smart Contract"
                    disabled={contractUpload}
                    onClick={updateAbiString}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="address" className="form-label"> Address </label>
                <input 
                    name = "address"
                    type="text"
                    className="form-control"
                    value={address}
                    placeholder = "0x..."
                    disabled = {contractUpload}
                    onChange={newValue => setAddress(newValue.target.value)}
                />
            </div>
            {contractUpload ? null : (
                <div className="text-center"  >
                    <button 
                        type="submit" 
                        className="btn btn-primary btn-lg"     
                        disabled = {!abiString || !address }>
                        Submit
                     </button>
                </div>
            )}
        </form>
        </>
    );
}