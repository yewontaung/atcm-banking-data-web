import { Dropdown } from "react-bootstrap";
import ThemeButton from "./theme-button";
import { AppProfile } from "./app-profile";
import { Link } from "react-router-dom";
import { ArrowUpRightFromSquareIcon, PlusSquareIcon, Trash2Icon, User2Icon } from "lucide-react";
import { iconSize } from "../_utils/constants";
import RolePermit from "./role-permit";
import { resolveProfileImage } from "../services/account.service";
import LogoutButton from "./logout-button";
import type { AuthProfile, ProfileResult } from "../_models/outputs";

export default function AppNav({ className, profile }: { className?: string, profile:AuthProfile | ProfileResult }) {
    return (
        <div className={className}>
            <ThemeButton />
            <Dropdown>
                <Dropdown.Toggle className="bg-transparent rounded-pill d-flex align-items-center text-primary px-2">
                    <AppProfile className="me-2" img={resolveProfileImage(profile.profileUrl)} /> <span className="d-none d-md-inline">{profile.accountName}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="">
                    <Dropdown.Item as="button">
                        <Link to="/me/profile" className="text-decoration-none d-block">
                            <User2Icon size={iconSize} className="me-3" /> Profile
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item as="button">
                        <Link to="/datasets/add" className="text-decoration-none d-block">
                            <PlusSquareIcon size={iconSize} className="me-3" /> Add Dataset
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item as="button">
                        <Link to="/datasets/export" className="text-decoration-none d-block">
                            <ArrowUpRightFromSquareIcon size={iconSize} className="me-3" /> Export Dataset
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

    )
}