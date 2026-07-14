import React, { useState } from "react";

export type FormsUtils<T> = {
    form: T;
    errors: { [K in keyof T]: string | undefined; };
    controls: { [K in keyof T]: K; };
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    reset: (value?: T) => void;
    setForm: React.Dispatch<React.SetStateAction<T>>;
    validate: () => boolean;
    onSubmit: (func: (value: T) => void) => (e?: React.SubmitEvent) => void;
}

export function useForms<T extends Record<string, unknown>>(t:T, validation?:(data:T, error:{[K in keyof T]: string | undefined}) => void):FormsUtils<T> {
    
    const [form, setForm] = useState<T>(t)

    const controls = {} as {[K in keyof T]: K}
    (Object.keys(form) as (keyof T)[]).forEach(i => controls[i] = i)

    const errorMessages = {} as {[K in keyof T]: string | undefined}
    (Object.keys(form) as (keyof T)[]).forEach(i => errorMessages[i] = undefined)
    const [errors, setErrors] = useState<{[K in keyof T]: string | undefined}>(errorMessages)

    const validate = () => {
        validation?.(form, errorMessages)
        setErrors(errorMessages)
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

    const reset = (value?:T) => setForm(() => (value ?? t))
    
    const onSubmit = (func:(value:T) => void) => {
        
        const handle = (e?:React.SubmitEvent) => {
            e?.preventDefault()
            func(form)
        }

        return handle
    }

    return {form, errors, controls, onChange, reset, setForm, validate, onSubmit}
}

export function useArrayField<T, F>(fieldName:keyof T, form:T, setForm:React.Dispatch<React.SetStateAction<T>>) {

    const fields = form[fieldName] as F[]

    const append = (value:F) => {
        setForm(prev => (
            {
                ...prev,
                [fieldName]: [
                    ...prev[fieldName] as F[],
                    value
                ]
            }
        ))
    }

    const remove = (index:number) => {
        setForm(prev => (
            {
                ...prev,
                [fieldName]: [
                    ...(prev[fieldName] as F[]).filter((_, i) => i !== index),
                ]
            }
        ))
    }
    
    return {fields, append, remove}
}