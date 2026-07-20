import { Container, Navbar } from "react-bootstrap";
import { Navigate, Outlet } from "react-router-dom";
import ThemeButton from "../_components/theme-button";
import { getAuthToken } from "../_utils/auth.utils";
import { useEffect } from "react";

export default function AuthLayout() {

    const { accessToken: access_token } = getAuthToken()

    useEffect(() => {
        document.title = `${import.meta.env.VITE_PROJECT_TITLE} | Sign in`
    }, [])


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