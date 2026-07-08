import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";
import { useState } from "react";

export default function IntentForm({isOpen, closeModal}:ModalState) {
    const [ners, setNers] = useState<{id:string, label:string}[]>([
        {id: "1", label: "AMOUNT"},
        {id: "2", label: "RECEIVER"},
        {id: "3", label: "CARD"},
    ])
    const [selectedNers, setSelectedNers] = useState<{id:string, label:string}[]>([])
    const onSelect = (id:string) => {
        setNers(prev => prev.filter(i => i.id !== id))
        setSelectedNers(prev => [...prev, ners.filter(i => i.id === id)[0]])
    }

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Add Intent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormsInput className="mb-3" label="Intent Label" placeholder="Enter intent label" />
                    <FormsInput className="mb-3" as="textarea" label="Description" placeholder="Enter description" />
                    <Container fluid className="mb-4">
                        <h6>Add NERs</h6>
                        <Row className="row-cols-2 align-items-cente row-gap-3">
                            {selectedNers && selectedNers.map(i => <div key={i.id} className="col"><div className="form-control">{i.label}</div></div>)}
                            {ners.length > 0 && (
                                <div className="col">
                                    <Form.Select onChange={e => onSelect(e.target.value)}>
                                        <option>Select NER</option>
                                        {ners.map(i => <option key={i.id} value={i.id}>{i.label}</option>)}
                                    </Form.Select>
                                </div>
                            )}
                        </Row>
                    </Container>
                    <div className="d-flex gap-2">
                        <Button onClick={closeModal} type="button" variant="outline-secondary" className="w-50">Cancel</Button>
                        <Button className="w-50">Save Intent</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}