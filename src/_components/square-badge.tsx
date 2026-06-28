const colorMap = {
    "blue": "bg-primary-subtle text-muted",
    "red": "bg-danger-subtle text-muted",
    "yellow": "bg-warning text-dark",
    "green": "bg-success text-white",
    "gray": "bg-secondary text-muted",
}

export default function SquareBadge({text, className, color="blue"}:{text:string, className?:string, color?:"blue"|"red"|"yellow"|"green"|"gray"}) {
    return (
        <span className={`px-1 ${colorMap[color]} ${className}`}>{text}</span>
    )
}