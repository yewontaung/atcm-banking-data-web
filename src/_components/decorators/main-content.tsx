import type { ReactNode } from "react";
import ThemeButton from "../theme-button";
import { Link } from "react-router-dom";
import { AppProfile } from "../app-profile";
import { defaultProfile } from "../../_utils/constants";
import { Container } from "react-bootstrap";

export default function MainContentDecorator({title, children}:{title:string, children:ReactNode}) {
    return (
        <div>
            <Container className="d-flex justify-content-between">
                <span className="fw-semibold fs-5">{title}</span>
                <div className="align-self-start">
                    <ThemeButton />
                    <Link to="/me/profile" className="ms-3">
                        <AppProfile img={defaultProfile} />
                    </Link>
                </div>
            </Container>
            {children}
        </div>
    )
}