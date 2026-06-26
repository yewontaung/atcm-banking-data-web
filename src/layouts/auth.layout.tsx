import { Container, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import ThemeButton from "../_components/theme-button";

export default function AuthLayout() {

    return (
        <>
            <section>
                <Navbar expand className="shadow-sm">
                    <Container>
                        <Navbar.Brand href="#">ATCM Data</Navbar.Brand>
                        <ThemeButton />
                    </Container>
                </Navbar>
                <div className="container mt-5 d-flex justify-content-center">
                    <Outlet />
                </div>
            </section>
        </>
    )
}