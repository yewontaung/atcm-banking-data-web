import { Button, Form, Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";
import FormsSelect from "../ui/forms.select";

export default function MemberForm({isOpen, closeModal}:ModalState) {
    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Add Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <div className="d-flex">
                        <FormsInput className="mb-3 flex-grow-1 me-3" label="Name" placeholder="Enter member name" />
                        <FormsSelect label="Role">
                            <option value={"collector"}>Collector</option>
                            <option value={"supervisor"}>Supervisor</option>
                            <option value={"admin"}>Admin</option>
                        </FormsSelect>
                    </div>
                    <FormsInput className="mb-3" label="Email" placeholder="Enter member email" />
                    <div className="d-flex column-gap-2 mt-3">
                        <Button className="w-50" variant="outline-secondary" onClick={closeModal}>Cancel</Button>
                        <Button className="w-50">Add</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}