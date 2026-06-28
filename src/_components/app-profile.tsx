import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export function AppProfile({img, className}:{img:string, className?:string}) {
    return (
        <Link to="/me/profile">
            <Image src={img} width={40} height={40} style={{
                objectFit: "cover",
            }} roundedCircle alt="Profile Image" className={` ${className}`} />
        </Link>
    )
}