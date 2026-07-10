import React, { useState } from "react";

export function useForms<T extends Record<string, unknown>>(t:T, validation?:(data:T, error:{[K in keyof T]: string | undefined}) => void) {
    
    const [form, setForm] = useState<T>(t)

    const controls = {} as {[K in keyof T]: K}
    (Object.keys(form) as (keyof T)[]).forEach(i => controls[i] = i)

    const errorMessages = {} as {[K in keyof T]: string | undefined}
    (Object.keys(form) as (keyof T)[]).forEach(i => errorMessages[i] = undefined)
    const [errors, setErrors] = useState<{[K in keyof T]: string | undefined}>(errorMessages)

    const validate = () => {
        validation?.(form, errorMessages)
        setErrors(errorMessages);
        return (Object.keys(form) as (keyof T)[]).filter(i => errorMessages[i] !== undefined).length === 0
    }
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if(e.target instanceof HTMLInputElement) {
            const {name, value, type, checked} = e.target
            setForm(prev => ({...prev, [name]: type === "checkbox" ? checked : value}))
        } else {
            const {name, value} = e.target
            setForm(prev => ({...prev, [name]: value}))
        }
    }

    const reset = () => setForm(t)
    return {form, onChange, controls, reset, setForm, validate, errors}
}