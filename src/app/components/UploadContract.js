"use client"

import { useState} from "react";
import { Contract } from "ethers";

export default function UploadContract ({ signer, setAbi, setContract }) {
    const [abiString, setAbiString] = useState("");
    const [address, setAddress] = useState("");
    const [contractUpload, setContractUpload] = useState(false);
    const [error, setError] = useState(undefined);

    const updateAbiString = data => {
        setError(undefined);
        setAbiString(data.target.value.trim());
    }

    const buildUI = e => {
        e.preventDefault();
        try {
            let abiObj = JSON.parse(abiString);
            const contract = new Contract(address, abiObj, signer);
            abiObj = abiObj.filter(element => element.type === "function");
            setAbi (abiObj);
            setContract(contract);
            setContractUpload(true);
        } catch(e) {
            setError("Not a Valid JSON");
        }

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
            {error && <div className="alert alert-danger mt-3 mb-0"><i class="bi bi-exclamation-triangle-fill"></i>{error}</div>}
        </form>
        </>
    );
}