const colorMap = {
    "blue": "bg-primary",
    "red": "bg-danger",
    "yellow": "bg-warning",
    "green": "bg-success"
}

export default function SquareBadge({text, className, color="blue"}:{text:string, className?:string, color?:"blue"|"red"|"yellow"|"green"}) {
    return (
        <span className={`px-1 text-white fs ${colorMap[color]} ${className}`}>{text}</span>
    )
}