import { Button, Form, Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";
import type { ModificationResult } from "../../_models/outputs";
import { useForms } from "../../_hooks/use-forms";
import type { NerForm } from "../../_models/schemas";
import * as nersService from "../../services/ners.service"

export default function NERForm({state:{isOpen, closeModal}, onSaved}:{state:ModalState, onSaved?:(result:ModificationResult<number>) => void}) {
    const {controls, errors, ...form} = useForms<NerForm>({label: ""}, (data, error) => {
        if(!data.label || data.label === "") error.label = "Please enter ner label."
    })

    const onSubmit = async (e:React.SubmitEvent) => {
        e.preventDefault()
        if(!form.validate()) return
        const result = await nersService.save(form.form)
        onSaved?.(result)
        form.reset()
    }

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Add Named Entities</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>

                    <FormsInput onChange={form.onChange} name={controls.label} error={errors.label} value={form.form.label} label="Enter NER label" placeholder="RECEIVER" className="mb-3" />

                    <div className="d-flex column-gap-2 mt-3">
                        <Button className="w-50" variant="outline-secondary" onClick={closeModal}>Cancel</Button>
                        <Button type="submit" className="w-50">Add</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}