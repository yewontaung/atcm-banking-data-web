import type React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function AppTooltip({className, id, title, children}:{className?:string, id:string, title:string, children:React.ReactNode}) {
    return (
        <OverlayTrigger overlay={<Tooltip className={className} id={id}>{title}</Tooltip>}>
            <span>{children}</span>
        </OverlayTrigger>
    )
}