import type React from "react";
import { Form, type FormSelectProps } from "react-bootstrap";

type FormsSelectProps = {
    label?:string,
    htmlFor?:string,
    className?:string,
    children:React.ReactNode,
} & FormSelectProps


export default function FormsSelect({label, htmlFor, className, children, ...props}:FormsSelectProps) {
    return (
        <div className={` ${className}`}>
            {label && <label htmlFor={htmlFor}>{label}</label>}
            <Form.Select className="mt-2" {...props}>
                {children}
            </Form.Select>
        </div>
    )
}