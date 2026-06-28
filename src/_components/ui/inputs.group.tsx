import type { ReactNode } from "react";
import { InputGroup } from "react-bootstrap";

export default function InputsGroup({label, className, children}:{label?:string, className?:string, children:ReactNode}) {
    return (
        <div className={` ${className}`}>
            {label && <label>{label}</label>}
            <InputGroup className="mt-2">
                {children}
            </InputGroup>
        </div>
    )
}