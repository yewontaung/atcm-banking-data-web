import { Image } from "react-bootstrap";

export function AppProfile({img, className}:{img:string, className?:string}) {
    return (
        <Image src={img} width={40} height={40} style={{
            objectFit: "cover",
        }} roundedCircle alt="Profile Image" className={` ${className}`} />
    )
}