import type { ReactNode } from "react";
import ThemeButton from "../theme-button";
import { Link } from "react-router-dom";
import { AppProfile } from "../app-profile";
import { defaultProfile, iconSize } from "../../_utils/constants";
import { Container, Dropdown } from "react-bootstrap";
import { Trash2Icon, User2Icon } from "lucide-react";
import LogoutButton from "../logout-button";

export default function MainContentDecorator({title, children}:{title:string, children:ReactNode}) {
    return (
        <div>
            <Container fluid className="d-flex justify-content-between">
                <span className="fw-semibold fs-5">{title}</span>
                <div className="align-self-start d-flex gap-3">
                    <ThemeButton />
                    <Dropdown>
                        <Dropdown.Toggle className="bg-transparent border-0">
                            <AppProfile className="me-2" img={defaultProfile} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="">
                            <Dropdown.Item as="button">
                                <Link to="/me/profile" className="text-decoration-none text-white">
                                    <User2Icon size={iconSize} className="me-3" /> Profile
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <Link to="/datasets/bin" className="text-decoration-none text-white">
                                    <Trash2Icon size={iconSize} className="me-3" /> Recycle bin
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item>
                                <LogoutButton />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Container>
            {children}
        </div>
    )
}