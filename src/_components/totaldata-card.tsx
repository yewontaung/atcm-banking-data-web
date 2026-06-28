export default function TotalDataCard({className, label, total}:{className?:string, label?:string, total:number}) {
    return (
        <div className={`border p-3 text-center shadow-sm ${className}`}>
            <h6>{label}</h6>
            <h2>{total}</h2>
        </div>
    )
}