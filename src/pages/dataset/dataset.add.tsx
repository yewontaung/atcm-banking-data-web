import { Accordion, Button, ButtonGroup, Container, Form, InputGroup, Row, Tab, Tabs } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { ClipboardIcon, TrashIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import { GroupLabelInfo } from "../../_components/label-info";
import InputsGroup from "../../_components/ui/inputs.group";
import type { DatasetForm, DatasetIntentItem, DatasetIntentNerItem } from "../../_models/schemas";
import { useControls } from "../../_hooks/use-controls";
import { useEffect, useState } from "react";
import { FormsInput } from "../../_components/ui/forms.input";
import { useModals, type ModalState } from "../../_hooks/use-modals";
import FormPreview from "../../_components/modals/form.preview";
import { useArrayField, useForms, type FormsUtils } from "../../_hooks/use-forms";
import type { IntentListItem } from "../../_models/outputs";
import * as intentService from "../../services/intent.service"
import * as datasetService from "../../services/dataset.service";
import { useNavigate } from "react-router-dom";

export default function DatasetEditPage() {

    const [preview, setPreview] = useState<DatasetForm>()
    const modalState = useModals()

    return (
        <MainContentDecorator title="Add Data">
            {/* <div>{JSON.stringify(form)}</div> */}
            <Tabs defaultActiveKey="manual-form">
                <Tab title="Manual Form" eventKey="manual-form">

                    <ManualEditForm previewModalState={modalState} setPreview={setPreview} />

                </Tab>

                <Tab title="Json Input" eventKey="json-input">
                    <JsonEditForm />
                </Tab>
            </Tabs>
            <FormPreview form={preview} state={modalState} />
        </MainContentDecorator>
    )
}

function SelectIntentForm({ form, className, selected }: { className?: string, selected?: { start: number, end: number }, form: FormsUtils<DatasetForm> }) {

    const [intents, setIntents] = useState<IntentListItem[]>([])

    useEffect(() => {
        const loadIntents = async () => {
            const intents = await intentService.search()
            setIntents(intents)
        }
        loadIntents()
    }, [])

    const intentControl = useArrayField<DatasetForm, DatasetIntentItem>("intents", form.form, form.setForm)

    const intentForm = useControls<DatasetIntentItem>({
        intentId: 0,
        label: "",
        startIndex: 0,
        endIndex: 0,
        ners: []
    })

    const nerForm = useControls<DatasetIntentNerItem[]>([])
    
    const onIntentChange = (strId: string) => {
        if (strId === "") {
            intentForm.reset()
            nerForm.reset()
            return
        }
        const intentId = Number(strId)
        const intent = intents.filter(i => i.intentId === intentId)[0]
        intentForm.setData({ intentId: intent.intentId, label: intent.label, startIndex: 0, endIndex: 0, ners:[] })
        nerForm.setData(intent.ners.map(i => ({ ...i, startIndex: 0, endIndex: 0, intentId: strId })))
    }

    const addIntent = () => {
        if (!intentForm.data.intentId) return

        intentControl.append({
            ...intentForm.data, ners: nerForm.data
        })

        console.log(form.form)

        intentForm.reset()
        nerForm.reset()
    }

    const onIntentIndexChange = (index: "start" | "end", value: string) => {
        if (intentForm.data.intentId === Number(value)) return
        if (index === "start") {
            intentForm.setData(prev => ({ ...prev, startIndex: Number(value) }))
        } else {
            intentForm.setData(prev => ({ ...prev, endIndex: Number(value) }))
        }
    }

    const onNERIndexChange = (nerId: number, index: "start" | "end", value: string) => {

        if (index === "start") {
            console.log("Updating start")
            nerForm.setData(prev => (prev.map(i => i.nerId === nerId ? { ...i, startIndex: Number(value) } : i)))
        } else {
            console.log("Updating end")
            nerForm.setData(prev => (prev.map(i => i.nerId === nerId ? { ...i, endIndex: Number(value) } : i)))
        }
        console.log(nerForm.data)
    }

    const deleteIntent = (intentId: number, index: number) => {
        if (!intentId) return
        intentControl.remove(index)
    }

    const [checkedTarget, setCheckTarget] = useState<{ targetId: string|number, target: "intent" | "ner" } | undefined>(undefined)

    useEffect(() => {
        const onSelection = (start: number, end: number) => {
            if (!checkedTarget) return
            if (checkedTarget.target === "intent") {
                intentForm.setData(prev => ({ ...prev, startIndex: start, endIndex: end }))
            } else {
                const entity = nerForm.data.filter(i => i.nerId == checkedTarget.targetId)[0]
                nerForm.setData(prev => (prev.map(i => i.nerId === checkedTarget.targetId ? { ...entity, startIndex: start, endIndex: end } : i)))
            }
        }
        if (selected) {
            onSelection(selected.start, selected.end)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])

    return (
        <div className={` ${className}`}>
            <Container>
                {/* Editing Intents / Intent form */}
                <Row className="gap-1 mb-3 px-3">
                    <InputsGroup label="Intent" className="col-5 px-0">
                        <InputGroup.Radio name="current" onChange={e => {
                            if (e.target.checked) setCheckTarget({ targetId: intentForm.data.intentId, target: "intent" })
                        }} />
                        <Form.Select value={intentForm.data.intentId} onChange={e => onIntentChange(e.target.value)}>
                            <option value="">Select Intent</option>
                            {intents.map(intent => <option key={intent.intentId} value={intent.intentId}>{intent.label}</option>)}
                        </Form.Select>
                    </InputsGroup>

                    <FormsInput label="Start" onChange={e => onIntentIndexChange("start", e.target.value)} className="col-2 px-0" placeholder="0" value={intentForm.data.startIndex} />
                    <FormsInput label="End" onChange={e => onIntentIndexChange("end", e.target.value)} className="col-2 px-0" placeholder="0" value={intentForm.data.endIndex} />
                    <Button onClick={addIntent} className="w-auto align-self-end mx-1">Add Intent</Button>
                </Row>

                {nerForm.data.length > 0 && <small className="text-warning">NER Alignment</small>}
                {nerForm.data.map((item, idx) => (
                    <Row key={idx} className="gap-1 px-3">

                        <InputsGroup className="col-5 px-0">
                            <InputGroup.Radio name="current" onChange={e => {
                                if (e.target.checked) setCheckTarget({ targetId: item.nerId, target: "ner" })
                            }} />
                            <span className="form-control">{item.label}</span>
                        </InputsGroup>
                        <InputsGroup className="col-2 px-0">
                            <Form.Control className="" placeholder="0" name={`nerStart${item.nerId}${idx}`} onChange={e => onNERIndexChange(item.nerId, "start", e.target.value)} value={item.startIndex} />
                        </InputsGroup>
                        <InputsGroup className="col-2 px-0">
                            <Form.Control className="" placeholder="0" name={`nerStart${item.nerId}${idx}`} onChange={e => onNERIndexChange(item.nerId, "end", e.target.value)} value={item.endIndex} />
                        </InputsGroup>
                    </Row>
                ))}
                {/* <Row className="mt-3 gap-1">
                    <Button onClick={addIntent} className="col-8 mx-1">Add Intent</Button>
                </Row> */}
            </Container>
            <Container>
                {/* Added Intents */}
                <Accordion className="mt-3">
                    {form.form.intents.map((intent, idx) => (
                        <Accordion.Item key={intent.intentId} eventKey={`${idx}`}>
                            <Accordion.Header>
                                <Container fluid className="position-relative">
                                    <Row className="gap-1">
                                        <GroupLabelInfo label="Intent" className="col-5 px-0" info={intent.label} />
                                        <GroupLabelInfo label="Start" className="col-2 px-0" info={intent.startIndex} />
                                        <GroupLabelInfo label="End" className="col-2 px-0" info={intent.endIndex} />
                                        <ButtonGroup className="col-auto align-self-end px-0">
                                            {/* <Button variant="outline-primary">Edit</Button> */}
                                            <Button onClick={() => deleteIntent(intent.intentId, idx)} variant="outline-danger"><TrashIcon size={iconSize} /></Button>
                                        </ButtonGroup>
                                    </Row>
                                </Container>
                            </Accordion.Header>
                            {intent.ners.length > 0 && (
                                <Accordion.Body>
                                    <Container fluid>
                                        {intent.ners.map((ne, idx) => (
                                            <Row key={idx} className="gap-1 mb-1">
                                                <GroupLabelInfo label="NER" className="col-4 px-0" info={ne.label} />
                                                <GroupLabelInfo label="Start" className="col-2 px-0" info={ne.startIndex} />
                                                <GroupLabelInfo label="End" className="col-2 px-0" info={ne.endIndex} />
                                            </Row>
                                        ))}
                                    </Container>
                                </Accordion.Body>
                            )}
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Container>
        </div>
    )
}


function ManualEditForm({setPreview, previewModalState}:{previewModalState:ModalState, setPreview:(preview:DatasetForm) => void}) {

    const navigate = useNavigate()

    const [editCommand, setEditCommand] = useState(true)

    const formUtils = useForms<DatasetForm>({
        command: "",
        datasetType: "Training",
        intents: []
    }, (data, error) => {
        if(!data.command || data.command === "") {
            error.command = "Please enter command."
        }
        if(data.intents.length === 0) {
            error.intents = "Please add at lease one intent."
        }
    })

    const {controls, errors, onChange, onSubmit, ...form} = formUtils

    const openPreview = () => {
        setPreview(form.form)
        previewModalState.openModal()
    }
    

    const [selected, setSelected] = useState<{ start: number, end: number }>()
    const onSelected = () => {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return
        const range = selection.getRangeAt(0)
        setSelected({ start: range.startOffset, end: range.endOffset })
    }

    const onSave = async () => {
        console.log(form.form)
        if(!form.validate()) return
        try {
            const result = await datasetService.save(form.form)
            navigate(`/datasets/${result.resultData}`)
        } catch {
            console.log("Something wrong.")
        }
    }

    return (
        <Container className="mt-3">
            <Form onSubmit={onSubmit(onSave)} className="row">
                <div className="col">
                    <div className="mb-3 d-flex justify-content-between align-items-center">
                        <div>
                            <label>Command</label><Form.Check onChange={e => setEditCommand(e.target.checked)} checked={editCommand} className="d-inline ms-4 me-2" id="editCommand" /><label htmlFor="editCommand">Edit Text</label>
                        </div>
                        <Form.Select name={controls.datasetType} value={form.form.datasetType} onChange={onChange} className="w-auto">
                            <option>Training</option>
                            <option>Validation</option>
                            <option>Testing</option>
                        </Form.Select>
                    </div>
                    {editCommand && (
                        <>
                            <Form.Control as="textarea" className="mt-2" placeholder="Enter command text" name={controls.command} value={form.form.command} onChange={onChange} />
                            {errors.command && <span>{errors.command}</span>}
                        </>
                    )}
                    {editCommand || <p onMouseUp={onSelected} className="form-control p-3">{form.form.command}</p>}
                    <SelectIntentForm selected={selected} className="mt-3" form={formUtils} />
                </div>

                <div className="col-3">
                    <Button type="button" onClick={openPreview} className="w-100 mb-3" variant="outline-primary">Preview form</Button>
                    <Button type="submit" className="w-100">Save for review</Button>
                </div>
            </Form>
        </Container>

    )
}


function JsonEditForm() {
    return (
        <Container className="p-2">
            <Row>
                <div className="col-auto flex-fill">
                    <div>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary"><ClipboardIcon size={iconSize} /> Paste</Button>
                            <Form.Select className="w-auto">
                                <option>Training</option>
                                <option>Validation</option>
                                <option>Testing</option>
                            </Form.Select>
                        </div>
                        <Form.Control rows={16} as="textarea" placeholder="Paste" className="mt-3" />
                    </div>
                </div>
                <div className="col-auto">
                    <div>
                        {/* <Button onClick={state.openModal} variant="outline-primary" className="w-100 mb-3">Preview form</Button> */}
                        <Button className="w-100">Save for review</Button>
                    </div>
                </div>
            </Row>
        </Container>

    )
}