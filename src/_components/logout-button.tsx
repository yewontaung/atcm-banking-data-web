import { useNavigate } from "react-router-dom";
import { iconSize } from "../_utils/constants";
import { LogOutIcon } from "lucide-react";
import { removeAuth } from "../_utils/auth.utils";

export default function LogoutButton({onLogout}:{onLogout?:() => void}) {

    const navigate = useNavigate()

    const logOut = () => {
        onLogout?.()
        removeAuth()
        navigate("/auth/sign-in")
    }

    return (
        <div onClick={logOut} className="text-danger">
            <LogOutIcon size={iconSize} className="me-3" /> Logout
        </div>
    )
}