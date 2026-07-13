import { Button, Container, Form, Modal, Row } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";
import { useEffect, useState } from "react";
import type { ModificationResult, NerListItem } from "../../_models/outputs";
import * as nerService from "../../services/ners.service"
import * as intentService from "../../services/intents.service"
import { useArrayField, useForms } from "../../_hooks/use-forms";
import type { IntentForm } from "../../_models/schemas";

export default function IntentFormModal({state:{isOpen, closeModal}, onSaved}:{state:ModalState, onSaved?:(result:ModificationResult<number>) => void}) {
    const [ners, setNers] = useState<NerListItem[]>([])
    const [selectedNers, setSelectedNers] = useState<NerListItem[]>([])

    useEffect(() => {
        const loadNers = async () => {
            const items = await nerService.search()
            setNers(items)
        }
        loadNers()
    }, [setNers])


    const {controls, errors, ...form} = useForms<IntentForm>({
        label: "", 
        description: "", 
        ners: [],
    }, (data, errors) => {
        if(!data.label || data.label === "") {
            errors.label = "Please enter intent label."
        }
        if(!data.description || data.description === "") {
            errors.description = "Please enter description."
        }
    })

    const {append} = useArrayField<IntentForm, number>("ners", form.form, form.setForm)

    const onSelect = (strId:string) => {
        const nerId = Number(strId)
        setNers(prev => prev.filter(i => i.nerId !== nerId))
        setSelectedNers(prev => [...prev, ners.filter(i => i.nerId === nerId)[0]])
        append(nerId)
    }

    const save = async () => {
        console.log(form.form)
        if(!form.validate()) return
        const result = await intentService.save(form.form)
        form.reset()
        setSelectedNers([])
        onSaved?.(result)
    }

    const cancel = () => {
        form.reset()
        setSelectedNers([])
        closeModal()
    }

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Add Intent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={form.onSubmit(save)}>
                    <FormsInput onChange={form.onChange} name={controls.label} value={form.form.label} error={errors.label} className="mb-3" label="Intent Label" placeholder="Enter intent label" />
                    <FormsInput onChange={form.onChange} name={controls.description} value={form.form.description} error={errors.description} className="mb-3" as="textarea" label="Description" placeholder="Enter description" />
                    <Container fluid className="mb-4">
                        <h6>Add NERs</h6>
                        <Row className="row-cols-2 align-items-cente row-gap-3">
                            {selectedNers && selectedNers.map(i => <div key={i.nerId} className="col"><div className="form-control">{i.label}</div></div>)}
                            {ners.length > 0 && (
                                <div className="col">
                                    <Form.Select onChange={e => onSelect(e.target.value)}>
                                        <option>Select NER</option>
                                        {ners.map(i => <option key={i.nerId} value={i.nerId}>{i.label}</option>)}
                                    </Form.Select>
                                </div>
                            )}
                        </Row>
                    </Container>
                    <div className="d-flex gap-2">
                        <Button onClick={cancel} type="button" variant="outline-secondary" className="w-50">Cancel</Button>
                        <Button type="submit" className="w-50">Save Intent</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}