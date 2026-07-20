import { useEffect, type ReactNode } from "react";
import { Container } from "react-bootstrap";
import { getAuthProfile } from "../../_utils/auth.utils";
import AppNav from "../app-nav";

export default function MainContentDecorator({title, children}:{title:string, children:ReactNode}) {
    const profile = getAuthProfile()

    useEffect(() => {
        document.title = `${import.meta.env.VITE_PROJECT_TITLE} | ${title}`
    }, [title])

    return (
        <div>
            <Container fluid className="d-flex justify-content-between">
                <span className="fw-semibold fs-5">{title}</span>
                <AppNav profile={profile} className="align-self-start d-flex gap-3" />
            </Container>
            {children}
        </div>
    )
}