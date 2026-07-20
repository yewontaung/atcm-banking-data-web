import { Button, Form, Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";
import type { ModificationResult } from "../../_models/outputs";
import { useForms } from "../../_hooks/use-forms";
import type { NerForm } from "../../_models/schemas";
import * as nersService from "../../services/ner.service"
import { useState } from "react";

export default function NERForm({state:{isOpen, closeModal}, onSaved}:{state:ModalState, onSaved?:(result:ModificationResult<number>) => void}) {
    const {controls, errors, ...form} = useForms<NerForm>({label: ""}, (data, error) => {
        if(!data.label || data.label === "") error.label = "Please enter ner label."
    })

    const [saving, setSaving] = useState(false)

    const onSubmit = async (e:React.SubmitEvent) => {
        e.preventDefault()
        if(!form.validate()) return
        setSaving(true)
        const result = await nersService.save(form.form)
        setSaving(false)
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

                    <FormsInput onChange={form.onChange} name={controls.label} error={errors.label} value={form.form.label} label="Enter NER label" placeholder="Enter named entites" className="mb-3" />

                    <div className="d-flex column-gap-2 mt-3">
                        <Button className="w-50" variant="outline-secondary" onClick={closeModal}>Cancel</Button>
                        <Button disabled={saving} type="submit" className="w-50">{saving ? "Saving..." : "Add"}</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}