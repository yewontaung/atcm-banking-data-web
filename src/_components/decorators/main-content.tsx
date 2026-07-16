import type { ReactNode } from "react";
import ThemeButton from "../theme-button";
import { Link } from "react-router-dom";
import { AppProfile } from "../app-profile";
import { defaultProfile, iconSize } from "../../_utils/constants";
import { Container, Dropdown } from "react-bootstrap";
import { PlusSquareIcon, Trash2Icon, User2Icon } from "lucide-react";
import LogoutButton from "../logout-button";
import RolePermit from "../role-permit";
import { getAuthProfile } from "../../_utils/auth.utils";

export default function MainContentDecorator({title, children}:{title:string, children:ReactNode}) {
    const profile = getAuthProfile()
    return (
        <div>
            <Container fluid className="d-flex justify-content-between">
                <span className="fw-semibold fs-5">{title}</span>
                <div className="align-self-start d-flex gap-3">
                    <ThemeButton />
                    <Dropdown>
                        <Dropdown.Toggle className="bg-transparent d-flex align-items-center">
                            <AppProfile className="me-2" img={profile.profileUrl ?? defaultProfile} /> {profile.accountName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="">
                            <Dropdown.Item as="button">
                                <Link to="/me/profile" className="text-decoration-none d-block">
                                    <User2Icon size={iconSize} className="me-3" /> Profile
                                </Link>
                            </Dropdown.Item>
                            <Dropdown.Item as="button">
                                <Link to="/datasets/add" className="text-decoration-none d-block">
                                    <PlusSquareIcon size={iconSize} className="me-3" /> Add Dataset
                                </Link>
                            </Dropdown.Item>
                            <RolePermit roles={["Admin", "Supervisor"]}>
                                <Dropdown.Item as="button">
                                    <Link to="/datasets/bin" className="text-decoration-none d-block">
                                        <Trash2Icon size={iconSize} className="me-3" /> Recycle bin
                                    </Link>
                                </Dropdown.Item>
                            </RolePermit>
                            <Dropdown.Divider />
                            <Dropdown.Item as="button">
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