import { Button, Container, Image, Offcanvas, Row } from "react-bootstrap";
import { iconSize } from "../../_utils/constants";
import { CloudUploadIcon, MailIcon, MenuIcon, SettingsIcon, TagIcon, User2Icon } from "lucide-react";
import TotalDataCard from "../../_components/totaldata-card";
import { getAuthProfile, updateAuthProfile } from "../../_utils/auth.utils";
import { useModals } from "../../_hooks/use-modals";
import PasswordFormModal from "../../_components/modals/password.form";
import { useEffect, useRef, useState } from "react";
import * as accountService from "../../services/account.service"
import { type ProfileResult, type AuthProfile } from "../../_models/outputs";
import AppNav from "../../_components/app-nav";
import AppSidebar from "../../_components/app-sidebar";

export default function MeProfilePage() {
    const changePasswordModal = useModals()
    const [profile, setProfile] = useState<ProfileResult>()

    useEffect(() => {
        const loadProfile = async () => {
            const result = await accountService.profile()
            updateAuthProfile(result as AuthProfile)
            setProfile(result)
        }

        loadProfile()

    }, [])

    const fileRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)

    const uploadProfile = async () => {
        if (!fileRef.current?.files) return
        try {
            setUploading(true)
            const file = fileRef.current.files[0]
            const { imageUrl } = await accountService.uploadProfile(file)

            setProfile(profile ? { ...profile, profileUrl: imageUrl } : profile)
            updateAuthProfile(profile as AuthProfile)
        } finally {
            setUploading(false)
        }
    }

    const { openModal, isOpen, closeModal } = useModals()

    return (
        <Container>
            <AppNav profile={profile ?? getAuthProfile()} className="position-absolute end-0 me-4 d-flex gap-2" />

            <Button className="d-lg-none" onClick={openModal} size="sm" variant="outline-secondary"><MenuIcon size={iconSize} /></Button>
            <Offcanvas show={isOpen} onHide={closeModal}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title><Image src="/favicon.png" width={36} height={36} className="me-2" />ATCM Banking Data</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <AppSidebar showTitle={false} className="border-0" />
                </Offcanvas.Body>
            </Offcanvas>

            <Row>
                <div className="col-12 col-md-auto col-lg-auto">
                    <div className="py-3">
                        <Image src={accountService.resolveProfileImage(profile?.profileUrl)} className="d-block mx-auto" roundedCircle width={200} height={200} style={{ objectFit: "cover" }} />
                        <div className="p-2 mt-3 d-flex flex-column row-gap-2 mx-5 mx-lg-auto">
                            <div><User2Icon className="me-3" size={iconSize} /> {profile?.accountName}</div>
                            <div><MailIcon className="me-3" size={iconSize} /> {profile?.accountEmail}</div>
                            <div><TagIcon className="me-3" size={iconSize} /> {profile?.accountRole}</div>
                            <Button onClick={() => fileRef.current?.click()} className="mt-3" disabled={uploading}><CloudUploadIcon size={iconSize} /> {uploading ? "Uploading..." : "Upload Profile"}</Button>
                            <input ref={fileRef} onChange={uploadProfile} type="file" name="file" accept="image/*" className="d-none" />
                            <Button onClick={changePasswordModal.openModal} variant="outline-primary" className=""><SettingsIcon size={iconSize} /> Change Password</Button>
                            <PasswordFormModal state={changePasswordModal} />
                        </div>
                    </div>
                </div>
                <div className="col-auto col-md-6 flex-grow-1">
                    <Container className="p-4">
                        <h5>Collect Rate Summary</h5>
                        <div className="d-flex gap-3 mt-3 flex-wrap row">
                            <TotalDataCard label="Training Dataset" total={profile?.trainingDataset ?? 0} className="col-12 col-md-8 col-lg-3" />
                            <TotalDataCard label="Validation Dataset" total={profile?.validationDataset ?? 0} className="col-12 col-md-8 col-lg-3" />
                            <TotalDataCard label="Testing Dataset" total={profile?.testingDataset ?? 0} className="col-12 col-md-8 col-lg-3" />
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