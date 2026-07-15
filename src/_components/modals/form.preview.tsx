import { Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import type { DatasetForm } from "../../_models/schemas";
import { AppJsonView } from "../app-jsonview";

export default function FormPreview({state:{isOpen, closeModal}, form}:{state:ModalState, form?:DatasetForm}) {
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Dataset Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {form && <AppJsonView name="dataset" data={form} />}
                </div>
            </Modal.Body>
        </Modal>
    )
}