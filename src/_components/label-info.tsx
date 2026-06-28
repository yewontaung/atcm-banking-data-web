export function GroupLabelInfo({label, info, className}:{label?:string, info:string|number, className?:string}) {
    return (
        <div className={className}>
            <div className={`input-group`}>
                {label && <label className="input-group-text">{label}</label>}
                <div className="form-control">{info}</div>
            </div>
        </div>
    )
}

export function LabelInfo({label, info, className}:{label?:string, info:string, className?:string}) {
    return (
        <div className={className}>
            {label && <label>{label}</label>}
            <div className="mt-2 form-control">{info}</div>
        </div>
    )
}