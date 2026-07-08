import { Button, Form, Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";

export default function NERForm({state:{isOpen, closeModal}}:{state:ModalState}) {
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Add Named Entities</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <FormsInput label="Enter NER label" placeholder="RECEIVER" className="mb-3" />

                    <div className="d-flex column-gap-2 mt-3">
                        <Button className="w-50" variant="outline-secondary" onClick={closeModal}>Cancel</Button>
                        <Button className="w-50">Add</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}