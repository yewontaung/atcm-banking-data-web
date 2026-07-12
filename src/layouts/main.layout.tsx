import { Navigate, Outlet } from "react-router-dom";
import AppSidebar from "../_components/app-sidebar";
import { getAuthToken } from "../_utils/auth.utils";

export default function MainLayout() {
    const {accessToken: access_token} = getAuthToken()
    if(!access_token) {
        return <Navigate to="/auth/sign-in" replace />
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-auto">
                        <AppSidebar />
                    </div>
                    <div className="col ps-0 pe-2">
                        <div className="min-vh-100 py-2 d-flex flex-column">
                            <div className="border flex-grow-1 p-2"><Outlet /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}