"use client"

import { argv } from "process";
import { useState } from "react"

export default function FunctionUI({ fn, contract }) {
    const initialInputVals = fn.inputs.reduce((acc, input) => ({...acc, ...{[input.name]: ""}}), {});
    const [inputVals, setInputVals] = useState(initialInputVals);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState(undefined);
    const [txConfirmation, setTxConfirmation] = useState(undefined);
    const [error, setError] = useState(undefined);

    const updateInputVal = (inputName, newValue) => {
        setResponse(undefined);
        setTxConfirmation(undefined);
        setInputVals (
            {...inputVals, ...{[inputName]:newValue.target.value}}
        );
    };
    const isDisabled = () => {
        return fn.inputs.some(input => inputVals[input.name] === "" );
    }
    const executeFn = async e => {
        e.preventDefault();
        setLoading(true);
        try {
        if (fn.stateMutability === "view") {
            const response = await contract[fn.name](...Object.values(inputVals));
            //bigint
            setResponse(response.toString());
            /**
             * // inputVals
             * {
             *      to : "0xljkljljljlhljj",
             *      amount : 9864646464
             * }
             * //Object.value(inputVals)
             * ["0xljkljljljlhljj", 9864646464]
             * 
             * fn(...Object.value(inputVals))
             * fn("0xljkljljljlhljj", 9864646464)
             */
         //   contract.transfer(arg1, arg2, ...)
         return
        }
        const tx = await contract[fn.name](...Object.values(inputVals));
        const txReceipt = await tx.wait();
        setTxConfirmation("Your Transection was mined :  ${txReceipt.hash} ");
    } catch {
        setError (" There is an Error, Try again Later");
    } finally {
        setLoading(false);
    }
    };
    return ( 
        <>
        <div className="mb-3 input-container">
            <h3>{fn.name}</h3>
            <form className="input" onSubmit={executeFn}>
                {fn.inputs.map( input => (
                    <div key={input.name} className="mb-3">
                        <label htmlFor={input.name} className="form-label">{input.name}</label>
                        <input 
                            name= {input.name}
                            type = "text"
                            className="form-control"
                            value={inputVals [input.name]}
                            placeholder={input.type}
                            onChange = {newValue => updateInputVal(input.name, newValue)}
                        />
                    </div>
                ))}
                <button type="submit" className="btn btn-primary" disabled={isDisabled()}>Submit</button>
            </form>
            { loading && <div className="alert alert-info mt-3 mb-0"><i class="bi bi-hourglass"></i> loading... </div> } 
            { response && <div className="alert alert-info mt-3 mb-0"><i class="bi bi-info-circle-fill"></i> {response} </div> } 
            { txConfirmation && <div className="alert alert-info mt-3 mb-0"><i class="bi bi-info-circle-fill"></i> {txConfirmation} </div> } 
            {error && <div className="alert alert-danger mt-3 mb-0"><i class="bi bi-exclamation-triangle-fill"></i>{error}</div>}
        </div>
        </>
    )
}