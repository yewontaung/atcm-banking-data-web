import { Container, Navbar } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import ThemeButton from "../_components/theme-button";
import { getAuthToken } from "../_utils/auth.utils";

export default function AuthLayout() {

    const {access_token} = getAuthToken()
    if (access_token) {
        return <Navigate to="/" replace />
    }
    return (
        <>
            <section>
                <Navbar expand className="shadow-sm">
                    <Container>
                        <Navbar.Brand href="#">ATCM Data</Navbar.Brand>
                        <ThemeButton />
                    </Container>
                </Navbar>
            </section>
            <section>
                <div className="container mt-5 d-flex justify-content-center">
                    <Outlet />
                </div>
            </section>
        </>
    )
}