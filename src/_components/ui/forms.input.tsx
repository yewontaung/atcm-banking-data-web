import { Form, type FormControlProps } from "react-bootstrap";

type FormsInputProps = {
    label?:string,
    htmlFor?:string,
    className?:string,
    error?:string,
} & FormControlProps

export function FormsInput({label, htmlFor, className, error, ...props}: FormsInputProps) {
    return (
        <div className={` ${className}`}>
            {label && <label htmlFor={htmlFor}>{label}</label>}
            <Form.Control className="mt-2" {...props}/>
            {error && <span className="text-danger">{error}</span>}
        </div>
    )
}