import { Image, Modal } from "react-bootstrap";
import type { ProfileResult } from "../../_models/outputs";
import type { ModalState } from "../../_hooks/use-modals";
import { defaultProfile, iconSize } from "../../_utils/constants";
import { MailIcon, TagIcon, User2Icon } from "lucide-react";
import { resolveProfileImage } from "../../services/account.service";

export default function MemberDetailModal({profile, modalState}:{profile?:ProfileResult, modalState:ModalState}) {
    return (
        <Modal show={modalState.isOpen} onHide={modalState.closeModal}>
            <Modal.Header closeButton>Profile Info</Modal.Header>
            <Modal.Body>
                <div className="d-flex gap-3 mb-3">
                    <div>
                        <Image roundedCircle width={100} height={100} src={resolveProfileImage(profile?.profileUrl)} className="d-block mx-auto" style={{objectFit: "cover"}} alt="profile image" />
                    </div>
                    <div className="p-2 d-flex flex-column gap-2">
                        <div><User2Icon size={iconSize} className="me-3" />{profile?.accountName}</div>
                        <div><TagIcon size={iconSize} className="me-3"/>{profile?.accountRole}</div>
                        <div><MailIcon size={iconSize} className="me-3" />{profile?.accountEmail}</div>
                    </div>
                </div>
                <hr />
                <div className="d-flex gap-3">
                    <Datacard label="Training Datasets" datasets={profile?.trainingDataset ?? 0} className="alert alert-primary" />
                    <Datacard label="Validation Datasets" datasets={profile?.validationDataset ?? 0} className="alert alert-secondary" />
                    <Datacard label="Testing Datasets" datasets={profile?.testingDataset ?? 0} className="alert alert-info" />
                </div>
            </Modal.Body>
        </Modal>
    )
}

function Datacard({label, datasets, className}:{label:string, datasets:number, className?:string}) {
    return (
        <div className={`text-center ${className}`}>
            <div className="small">{label}</div>
            <div className="fs-2 fw-bold">{datasets}</div>
        </div>
    )
}