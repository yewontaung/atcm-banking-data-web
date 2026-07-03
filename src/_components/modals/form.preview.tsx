import { Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import type { DatasetForm } from "../../_models/schemas";

export default function FormPreview({state:{isOpen, closeModal}, form}:{state:ModalState, form:DatasetForm}) {
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Dataset Preview</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    {JSON.stringify(form, null, 2)}
                </div>
            </Modal.Body>
        </Modal>
    )
}