import { useEffect, type ReactNode } from "react";
import { Button, Container, Image, Offcanvas } from "react-bootstrap";
import { getAuthProfile } from "../../_utils/auth.utils";
import AppNav from "../app-nav";
import { useModals } from "../../_hooks/use-modals";
import AppSidebar from "../app-sidebar";
import { MenuIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";

export default function MainContentDecorator({ title, children }: { title: string, children: ReactNode }) {
    const profile = getAuthProfile()

    useEffect(() => {
        document.title = `${import.meta.env.VITE_PROJECT_TITLE} | ${title}`
    }, [title])

    const { isOpen, openModal, closeModal } = useModals()


    return (
        <div>
            <Container fluid className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-3">
                    <Button className="d-lg-none" onClick={openModal} size="sm" variant="outline-secondary"><MenuIcon size={iconSize} /></Button>
                    <div className="fw-semibold fs-5 text-truncate" style={{maxWidth: 200}}>{title}</div>
                </div>

                <Offcanvas show={isOpen} onHide={closeModal}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title><Image src="/favicon.png" width={36} height={36} className="me-2" />ATCM Banking Data</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <AppSidebar showTitle={false} className="border-0" />
                    </Offcanvas.Body>
                </Offcanvas>

                <AppNav profile={profile} className="align-self-start d-flex gap-3" />
            </Container>
            {children}
        </div>
    )
}