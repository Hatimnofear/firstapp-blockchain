"use client"
import { useState} from "react";


export default function UploadContract () {
    const [abiString, setAbiString] = useState("");
    const [contractUpload, setContractUpload] = useState(false);

    const updateAbiString = data => {

    }
    
    return (
        <>
        <h3 className="text-lg">Step 1 : update Contract Details </h3>
        <form>
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
        </form>
        </>
    );
}