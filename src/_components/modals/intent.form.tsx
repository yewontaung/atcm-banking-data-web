import { Button, Form, Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";

export default function IntentForm({isOpen, closeModal}:ModalState) {
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Add Intent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormsInput className="mb-3" label="Intent Label" placeholder="Enter intent label" />
                    <FormsInput className="mb-3" as="textarea" label="Description" placeholder="Enter description" />
                    <div className="d-flex gap-2">
                        <Button onClick={closeModal} type="button" variant="outline-secondary" className="w-50">Cancel</Button>
                        <Button className="w-50">Save Intent</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}