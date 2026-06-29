import { Accordion, Button, ButtonGroup, Container, Form, InputGroup, Row } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import FormsSelect from "../../_components/ui/forms.select";
import { TrashIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import { GroupLabelInfo, LabelInfo } from "../../_components/label-info";
import InputsGroup from "../../_components/ui/inputs.group";
import type { DatasetForm } from "../../_models/schemas";
import { useControls, type DataControls } from "../../_hooks/use-controls";
import { getIntents } from "../../services/intents.service";
import { useEffect, useState } from "react";
import { FormsInput } from "../../_components/ui/forms.input";

export default function DatasetEditPage() {

    const [editCommand, setEditCommand] = useState(true)
    const [selected, setSelected] = useState<{ start: number, end: number }>()

    const controls = useControls<DatasetForm>({
        command: "",
        intents: [],
    })

    const [form, setForm] = [controls.data, controls.setData]

    const onSelected = () => {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return
        const range = selection.getRangeAt(0)
        setSelected({ start: range.startOffset, end: range.endOffset })
    }

    return (
        <MainContentDecorator title="Add Data">
            <div>{JSON.stringify(form)}</div>
            <Container className="mt-3">
                <Form>
                    <div>
                        <label>Command</label><Form.Check onChange={e => setEditCommand(e.target.checked)} checked={editCommand} className="d-inline ms-4 me-2" id="editCommand" /><label htmlFor="editCommand">Edit Text</label>
                        {editCommand && <Form.Control as="textarea" className="mt-2" placeholder="Enter command text" value={form.command} onChange={e => setForm(prev => ({ ...prev, "command": e.target.value }))} />}
                        {editCommand || <p onMouseUp={onSelected} className="form-control p-3">{form.command}</p>}
                    </div>
                    <SelectIntentForm selected={selected} className="mt-3" controls={controls} />
                    <div className="mt-4">
                        <Button className="w-100">Save for review</Button>
                    </div>
                </Form>
            </Container>
        </MainContentDecorator>
    )
}

function SelectIntentForm({ controls, className, selected }: { className?: string, selected?: { start: number, end: number }, controls: DataControls<DatasetForm> }) {
    const intentForm = useControls<{
        id: string,
        label: string,
        start: number,
        end: number,
    }>({
        id: "",
        label: "",
        start: 0,
        end: 0,
    })

    const nameEntitesForm = useControls<{
        id: string,
        label: string,
        start: number,
        end: number,
        intentId: string,
    }[]>([])

    const intents = getIntents()

    const onIntentChange = (id: string) => {
        if (id === "") {
            intentForm.reset()
            nameEntitesForm.reset()
            return
        }
        const intent = intents.filter(i => i.id === id)[0]
        intentForm.setData({ ...intent, start: 0, end: 0 })
        nameEntitesForm.setData(intent.namedEntities.map(i => ({ ...i, start: 0, end: 0, intentId: id })))
    }

    const addIntent = () => {
        if (intentForm.data.id === "") return
        controls.setData(prev => ({
            ...prev, intents: [{ ...intentForm.data, namedEntities: [...nameEntitesForm.data] }, ...prev.intents,]
        }))
        intentForm.reset()
        nameEntitesForm.reset()
    }

    const onIntentIndexChange = (index: "start" | "end", value: string) => {
        if (intentForm.data.id === "") return
        if (index === "start") {
            intentForm.setData(prev => ({ ...prev, start: Number(value) }))
        } else {
            intentForm.setData(prev => ({ ...prev, end: Number(value) }))
        }
    }

    const onNERIndexChange = (id: string, index: "start" | "end", value: string) => {
        const entity = nameEntitesForm.data.filter(i => i.id == id)[0]
        if (index === "start") {
            nameEntitesForm.setData(prev => (prev.map(i => i.id === id ? { ...entity, start: Number(value) } : i)))
        } else {
            nameEntitesForm.setData(prev => (prev.map(i => i.id === id ? { ...entity, end: Number(value) } : i)))
        }
    }

    const deleteIntent = (id: string, index: number) => {
        if (id === "") return
        controls.setData(prev => ({ ...prev, intents: prev.intents.filter((intent, idx) => !(intent.id === id && idx === index)) }))
    }

    const [checkedTarget, setCheckTarget] = useState<{ id: string, target: "intent" | "ner" } | undefined>(undefined)

    useEffect(() => {
        const onSelection = (start: number, end: number) => {
            if (!checkedTarget) return
            if (checkedTarget.target === "intent") {
                intentForm.setData(prev => ({ ...prev, start: start, end: end }))
            } else {
                const entity = nameEntitesForm.data.filter(i => i.id == checkedTarget.id)[0]
                nameEntitesForm.setData(prev => (prev.map(i => i.id === checkedTarget.id ? { ...entity, start: start, end: end } : i)))
            }
        }
        if(selected) {
            onSelection(selected.start, selected.end)
        }

    }, [selected])

    return (
        <div className={` ${className}`}>
            <Container>
                {/* Editing Intents / Intent form */}
                <Row className="gap-1 mb-3">
                    <InputsGroup label="Intent" className="col-4 px-0">
                        <InputGroup.Radio name="current" onChange={e => {
                            if (e.target.checked) setCheckTarget({ id: intentForm.data.id, target: "intent" })
                        }} />
                        <Form.Select value={intentForm.data.id} onChange={e => onIntentChange(e.target.value)}>
                            <option value="">Select Intent</option>
                            {intents.map(intent => <option key={intent.id} value={intent.id}>{intent.label}</option>)}
                        </Form.Select>
                    </InputsGroup>

                    <FormsInput label="Start" onChange={e => onIntentIndexChange("start", e.target.value)} className="col-2 px-0" placeholder="0" value={intentForm.data.start} />
                    <FormsInput label="End" onChange={e => onIntentIndexChange("end", e.target.value)} className="col-2 px-0" placeholder="0" value={intentForm.data.end} />
                </Row>
                {nameEntitesForm.data.length > 0 && <small className="text-warning">NER Alignment</small>}
                {nameEntitesForm.data.map((item, idx) => (
                    <Row key={idx} className="gap-1">

                        <InputsGroup className="col-4 px-0">
                            <InputGroup.Radio name="current" onChange={e => {
                                if (e.target.checked) setCheckTarget({ id: item.id, target: "ner" })
                            }} />
                            <span className="form-control">{item.label}</span>
                        </InputsGroup>
                        <InputsGroup className="col-2 px-0">
                            <Form.Control className="" placeholder="0" name="nerStart" onChange={e => onNERIndexChange(item.id, "start", e.target.value)} value={item.start} />
                        </InputsGroup>
                        <InputsGroup className="col-2 px-0">
                            <Form.Control className="" placeholder="0" name="nerEnd" onChange={e => onNERIndexChange(item.id, "end", e.target.value)} value={item.end} />
                        </InputsGroup>
                    </Row>
                ))}
                <Row className="mt-3 gap-1">
                    <Button onClick={addIntent} className="col-8 mx-1">Add Intent</Button>
                </Row>
            </Container>
            <Container>
                {/* Added Intents */}
                <Accordion className="mt-3">
                    {controls.data.intents.map((intent, idx) => (
                        <Accordion.Item key={intent.id} eventKey={`${idx}`}>
                            <Accordion.Header>
                                <Container fluid className="position-relative">
                                    <Row className="gap-1">
                                        <GroupLabelInfo label="Intent" className="col-4 px-0" info={intent.label} />
                                        <GroupLabelInfo label="Start" className="col-2 px-0" info={intent.start} />
                                        <GroupLabelInfo label="End" className="col-2 px-0" info={intent.end} />
                                        <ButtonGroup className="col-auto align-self-end px-0">
                                            {/* <Button variant="outline-primary">Edit</Button> */}
                                            <Button onClick={() => deleteIntent(intent.id, idx)} variant="outline-danger"><TrashIcon size={iconSize} /></Button>
                                        </ButtonGroup>
                                    </Row>
                                </Container>
                            </Accordion.Header>
                            {intent.namedEntities.length > 0 && (
                                <Accordion.Body>
                                    <Container fluid>
                                        {intent.namedEntities.map((ne, idx) => (
                                            <Row key={idx} className="gap-1">
                                                <GroupLabelInfo label="NER" className="col-4 px-0" info={ne.label} />
                                                <GroupLabelInfo label="Start" className="col-2 px-0" info={ne.start} />
                                                <GroupLabelInfo label="End" className="col-2 px-0" info={ne.end} />
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