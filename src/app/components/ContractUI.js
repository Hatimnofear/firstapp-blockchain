"use client"
import FunctionUI from "./FunctionUI";

export default function ContractUI({ abi, contract }) {
    return (
        <>
            <div className="text-center mt-3 mb-2 fs-2">&#11015;</div>
            <h3 className="mb-3 fw-bold"> Step 2 : Interact With Smart Contract </h3>
            {abi.map(fn => <FunctionUI fn={fn} contract={contract} /> )}
        </>
    );
}