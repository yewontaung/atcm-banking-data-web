import { Button, Container, Dropdown, Image, Row } from "react-bootstrap";
import { defaultProfile, iconSize } from "../../_utils/constants";
import { CloudUploadIcon, MailIcon, PlusSquareIcon, SettingsIcon, TagIcon, Trash2Icon, User2Icon } from "lucide-react";
import TotalDataCard from "../../_components/totaldata-card";
import ThemeButton from "../../_components/theme-button";
import { getAuthProfile, updateAuthProfile } from "../../_utils/auth.utils";
import { AppProfile } from "../../_components/app-profile";
import { Link } from "react-router-dom";
import LogoutButton from "../../_components/logout-button";
import RolePermit from "../../_components/role-permit";
import { useModals } from "../../_hooks/use-modals";
import PasswordFormModal from "../../_components/modals/password.form";
import { useEffect, useState } from "react";
import * as accountService from "../../services/account.service"
import { type ProfileResult, type AuthProfile } from "../../_models/outputs";

export default function MeProfilePage() {
    const changePasswordModal = useModals()
    const [profile, setProfile] = useState<ProfileResult>()

    useEffect(() => {
        const loadProfile = async () => {
            const result = await accountService.profile()
            const profile = getAuthProfile()
            if(result.accountRole !== profile.accountRole) {
                updateAuthProfile(result as AuthProfile)
            }
            setProfile(result)
        }

        loadProfile()

    }, [])

    return (
        <Container>
            <div className="position-absolute end-0 me-4 d-flex gap-2">
                <ThemeButton className="" />
                <Dropdown>
                    <Dropdown.Toggle className="bg-transparent text-primary">
                        <AppProfile className="me-2" img={profile?.profileUrl ?? defaultProfile} /> {profile?.accountName}
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

            <Row>
                <div className="col-auto">
                    <div className="py-3">
                        <Image src={profile?.profileUrl ?? defaultProfile} className="d-block mx-auto" roundedCircle width={200} height={200} style={{ objectFit: "cover" }} />
                        <div className="p-2 mt-3 d-flex flex-column row-gap-2">
                            <div><User2Icon className="me-3" size={iconSize} /> {profile?.accountName}</div>
                            <div><MailIcon className="me-3" size={iconSize} /> {profile?.accountEmail}</div>
                            <div><TagIcon className="me-3" size={iconSize} /> {profile?.accountRole}</div>
                            <Button className="mt-3"><CloudUploadIcon size={iconSize} /> Upload Profile</Button>
                            <Button onClick={changePasswordModal.openModal} variant="outline-primary" className=""><SettingsIcon size={iconSize} /> Change Password</Button>
                            <PasswordFormModal state={changePasswordModal} />
                        </div>
                    </div>
                </div>
                <div className="col-auto flex-grow-1">
                    <Container className="p-5">
                        <h5>Collect Rate Summary</h5>
                        <div className="d-flex gap-3 mt-3">
                            <TotalDataCard label="Training Dataset" total={profile?.trainingDataset ?? 0} className="w-25" />
                            <TotalDataCard label="Validation Dataset" total={profile?.validationDataset ?? 0} className="w-auto" />
                            <TotalDataCard label="Testing Dataset" total={profile?.testingDataset ?? 0} className="w-25" />
                        </div>
                    </Container>

                    {/* Permission List */}
                    <Container className="mt-3">
                        <h5>Permissions</h5>
                        <ul>
                            <li>Collect data</li>
                            {profile?.accountRole === "Supervisor" && (
                                <li>Review & approve pending dataset</li>
                            )}
                            {profile?.accountRole === "Admin" && (
                                <>
                                    <li>Manage memebers (add members, change roles)</li>
                                    <li>Add & edit intent data</li>
                                    <li>Manage named entities</li>
                                </>
                            )}
                        </ul>
                    </Container>
                </div>
            </Row>
        </Container>
    )
}