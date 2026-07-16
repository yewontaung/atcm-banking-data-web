import { Button, Form, Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";
import type { ActionCallback, NerListItem } from "../../_models/outputs";
import { useForms } from "../../_hooks/use-forms";
import type { NerForm } from "../../_models/schemas";
import { useEffect } from "react";

export default function NEREditModal({item, state:{isOpen, closeModal}, onEdit}:{item?:NerListItem, state:ModalState, onEdit?:ActionCallback<NerForm>}) {

    const {controls, errors, setForm, ...form} = useForms<NerForm>({label: item?.label ?? ""}, (data, error) => {
        if(!data.label || data.label === "") error.label = "Please enter ner label."
    })

    const submit = async () => {
        if(!form.validate()) return
        onEdit?.(form.form)
        form.reset()
    }

    useEffect(() => {
        if(!item) return
        setForm({label: item.label})
    }, [item, setForm])

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Edit Named Entities</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={form.onSubmit(submit)}>
                    <FormsInput onChange={form.onChange} name={controls.label} error={errors.label} value={form.form.label} label="Enter NER label" placeholder="Enter named entites" className="mb-3" />
                    <div className="d-flex column-gap-2 mt-3">
                        <Button className="w-50" variant="outline-secondary" onClick={closeModal}>Cancel</Button>
                        <Button type="submit" className="w-50">Save</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}