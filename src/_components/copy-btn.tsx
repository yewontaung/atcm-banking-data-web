import { useState } from "react"
import { Button } from "react-bootstrap"
import { iconSize } from "../_utils/constants"
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react"

export default function CopyBtn({onCopy, className}:{className?:string, onCopy?:() => void}) {
    const [copying, setCopying] = useState(false)
    const copy = () => {
        setCopying(true)
        setTimeout(() => setCopying(false), 1000)
        onCopy?.()
    }
    return (
        <>
            {copying || <Button className={`${className}`} variant="link" onClick={copy}><ClipboardIcon size={iconSize} /></Button>}
            {copying && <Button className={`${className}`} variant="link" onClick={copy}><ClipboardCheckIcon size={iconSize} /></Button>}
        </>
    )    
}