import MainContentDecorator from "../../_components/decorators/main-content"
import { Accordion, Alert, Badge, Button, Container, Form, Modal, Row, Tab, Tabs } from "react-bootstrap"
import { GroupLabelInfo, LabelInfo } from "../../_components/label-info"
import { ArrowRightIcon, Calendar1Icon, CheckIcon, Edit2Icon, InfoIcon, TagIcon, TriangleAlertIcon, User2Icon, XIcon } from "lucide-react"
import { iconSize } from "../../_utils/constants"
import type { ActionCallback, DatasetDetail, DatasetDetailIntent, DatasetDetailResult, DatasetInfo, ModificationResult, NextDatasetResult } from "../../_models/outputs"
import { AppJsonView } from "../../_components/app-jsonview"
import { useEffect, useRef, useState } from "react"
import { formateDate } from "../../_utils/date-formats"
import * as datasetService from "../../services/dataset.service"
import { useNavigate, useParams } from "react-router-dom"
import { useModals } from "../../_hooks/use-modals"
import RolePermit from "../../_components/role-permit"
import CopyBtn from "../../_components/copy-btn"
import { useForms, type FormsUtils } from "../../_hooks/use-forms"

type DatasetActionHandler = {
    onApproved?: (result: ModificationResult<number>) => void,
    onRestored?: (result: ModificationResult<number>) => void,
    onDeleted?: (result: ModificationResult<number>) => void,
    onMovedToBin?: (result: ModificationResult<number>) => void,
}

export default function DatasetDetailPage() {

    const navigate = useNavigate()
    const { datasetId } = useParams<"datasetId">()

    const [detailResult, setDetailResult] = useState<DatasetDetailResult>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadDetailResult = async () => {
            if (!datasetId) return
            try {
                setLoading(true)
                const result = await datasetService.findById(Number(datasetId))
                setDetailResult(result)
            } finally {
                setLoading(false)
            }
        }

        loadDetailResult()

    }, [datasetId])

    const onApproved = () => {
        setDetailResult(detailResult ? { ...detailResult, info: { ...detailResult.info, approved: true } } : detailResult)
    }

    const onRestored = () => {
        setDetailResult(detailResult ? { ...detailResult, info: { ...detailResult.info, deleted: false } } : detailResult)
    }

    const onDeleted = () => {
        navigate("/datasets/bin")
    }

    const onMovedToBin = () => {
        setDetailResult(detailResult ? { ...detailResult, info: { ...detailResult.info, deleted: true } } : detailResult)
    }

    const handlers = { onApproved, onMovedToBin, onRestored, onDeleted }
    const onNext = (result: NextDatasetResult) => {
        setDetailResult(undefined)
        setLoading(true)
        setTimeout(() => {
            navigate(`/datasets/${result.nextDatasetId}`)
        }, 500)
    }

    return (
        <MainContentDecorator title="Dataset Detail">
            <Tabs defaultActiveKey="info-view">
                <Tab eventKey="info-view" title="Information View">
                    {loading && <LoadingCard />}
                    {detailResult && <DefaultDatasetView onNext={onNext} handlers={handlers} detailResult={detailResult} onSaved={detail => setDetailResult({ ...detailResult, dataset: detail })} />}
                </Tab>
                <Tab eventKey="json-view" title="Json View">
                    {loading && <LoadingCard />}
                    {detailResult && <JsonDatasetView onNext={onNext} handlers={handlers} detailResult={detailResult} />}
                </Tab>
            </Tabs>
        </MainContentDecorator>
    )
}

const LoadingCard = () => {
    return (
        <div className="text-center rounded p-3 border border-secondary mt-4">Loading...</div>
    )
}

function JsonDatasetView({ detailResult: { info, dataset }, handlers, onNext }: { detailResult: DatasetDetailResult, handlers?: DatasetActionHandler, onNext?: ActionCallback<NextDatasetResult> }) {
    return (
        <Container className="p-2">
            <Row className="row-gap-3">
                <div className="col-12 col-xl-8">
                    <div className="h-100 position-relative border">
                        <CopyBtn className="z-3 position-absolute end-0 me-4" onCopy={() => window.navigator.clipboard.writeText(JSON.stringify(dataset))} />
                        <div className="overflow-y-auto overflow-x-auto" style={{ maxHeight: 500 }}>
                            <AppJsonView name="dataset" data={dataset} />
                        </div>
                    </div>
                </div>
                <div className="col-auto flex-grow-1">
                    <MetadataCard onNext={onNext} {...handlers} info={info} />
                </div>
            </Row>
        </Container>
    )
}

function DefaultDatasetView({ detailResult: { info, dataset }, handlers, onSaved, onNext }: { detailResult: DatasetDetailResult, handlers?: DatasetActionHandler, onSaved?: ActionCallback<DatasetDetail>, onNext?: ActionCallback<NextDatasetResult> }) {

    const [selected, setSelected] = useState<{ start: number, end: number }>()

    const [isEdit, setIsEdit] = useState(false)
    const editForm = useForms<DatasetDetail>(dataset)
    const [saving, setSaving] = useState(false)

    const textRef = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        const handleSelectionChange = () => {
            if (!textRef.current) return;

            const selection = window.getSelection();

            if (!selection || selection.rangeCount === 0) return;

            const range = selection.getRangeAt(0);

            // Ignore selection outside your text area
            if (!textRef.current.contains(range.commonAncestorContainer)) {
                return;
            }

            setSelected({
                start: range.startOffset,
                end: range.endOffset,
            });
        };

        document.addEventListener(
            "selectionchange",
            handleSelectionChange
        );

        return () => {
            document.removeEventListener(
                "selectionchange",
                handleSelectionChange
            );
        };
    }, []);

    return (
        <Container className="p-3">
            <Row className="row-gap-3">
                <div className="col-12 col-xl-8">
                    <div className="border p-3">
                        <div className="d-flex flex-column row-gap-2 justify-content-between align-items-start align-items-lg-center flex-lg-row">
                            <label className="text-nowrap">Command</label>
                            <div className="d-flex gap-2">
                                {!info.deleted && (
                                    <>
                                        {isEdit || <Button className="align-self-end" variant="outline-primary" onClick={() => setIsEdit(true)}><Edit2Icon size={iconSize} /></Button>}
                                        {isEdit && (
                                            <>
                                                <Button className="align-self-end" variant="outline-primary" onClick={async () => {
                                                    try {
                                                        setSaving(true)
                                                        await datasetService.edit(dataset.datasetId, editForm.form)
                                                        onSaved?.(editForm.form)
                                                        setIsEdit(false)
                                                    } finally {
                                                        setSaving(false)
                                                    }

                                                }}>{saving ? "Saving..." : <CheckIcon size={iconSize} />}</Button>
                                                <Button className="align-self-end" variant="outline-danger" onClick={() => {
                                                    editForm.reset()
                                                    setIsEdit(false)
                                                }}><XIcon size={iconSize} /></Button>
                                            </>
                                        )}
                                    </>
                                )}

                                <GroupLabelInfo label="Start" info={selected?.start ?? 0} />
                                <GroupLabelInfo label="End" info={selected?.end ?? 0} />
                            </div>
                        </div>
                        <hr />
                        <p ref={textRef} className="p-2 mt-2">{dataset.text}</p>
                    </div>
                    <IntentDetailList isEdit={isEdit} editForm={editForm} intents={dataset.intents} className="mt-3" />
                </div>
                <div className="col-auto flex-grow-1">
                    <MetadataCard onNext={onNext} {...handlers} info={info} />
                </div>
            </Row>
        </Container>
    )
}

function MetadataCard(
    { info, onApproved, onRestored, onDeleted, onMovedToBin, onNext }
        : {
            info: DatasetInfo,
            onApproved?: (result: ModificationResult<number>) => void,
            onRestored?: (result: ModificationResult<number>) => void,
            onDeleted?: (result: ModificationResult<number>) => void,
            onMovedToBin?: (result: ModificationResult<number>) => void,
            onNext?: ActionCallback<NextDatasetResult>,
        }) {

    const approveModal = useModals()
    const restoreModal = useModals()
    const deleteModal = useModals()
    const binModal = useModals()

    const [approving, setApproving] = useState(false)
    const [allowApprove, setAllowApprove] = useState(true)
    const [restoring, setRestoring] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [removing, setRemoving] = useState(false)

    const [alertMessage, setAlertMessage] = useState<string>()

    const goToNext = async () => {
        const result = await datasetService.nextDataset(info.datasetId)
        if (!result.nextDatasetId) {
            setAlertMessage("No pending datasets.")
            setTimeout(() => setAlertMessage(undefined), 3000)
        } else {
            onNext?.(result)
        }
    }

    return (
        <>
            {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
            <div className="border p-3 d-flex flex-column row-gap-3">
                <div><User2Icon size={iconSize} className="me-3" /> {info.memberName}</div>
                <div><TagIcon size={iconSize} className="me-3" /> {info.memberRole}</div>
                <div><InfoIcon size={iconSize} className="me-3" /> <Badge>{info.datasetType}</Badge></div>
                <div>
                    {info.approved && <><TriangleAlertIcon size={iconSize} className="me-3" /> <Badge bg="success" text="white">Reviewed</Badge></>}
                    {!info.approved && <><TriangleAlertIcon size={iconSize} className="me-3" /> <Badge bg="warning" text="dark">Pending</Badge></>}
                    {info.deleted && <><Badge className="ms-2" bg="danger" text="white">Deleted</Badge></>}
                </div>
                <div><Calendar1Icon size={iconSize} className="me-3" /> {formateDate(info.lastUpdated)}</div>
            </div>


            <RolePermit roles={["Admin", "Supervisor"]}>
                {/* Approve section */}
                {!info.approved && !info.deleted && <Button onClick={approveModal.openModal} variant="success" className="w-100 mt-3" disabled={approving || !allowApprove}>{approving ? "Approving" : "Approve Dataset"}</Button>}
                {!info.approved && !info.deleted && (
                    <Modal size="sm" animation={false} show={approveModal.isOpen} onHide={approveModal.closeModal}>
                        <Modal.Body>
                            <h6 className="text-center">Approve the dataset?</h6>
                            <div className="d-flex gap-2 mt-3">
                                <Button onClick={approveModal.closeModal} variant="outline-secondary" className="w-50">Cancel</Button>
                                <Button autoFocus onClick={async () => {
                                    try {
                                        setApproving(true)
                                        const result = await datasetService.approve(info.datasetId)
                                        approveModal.closeModal()
                                        onApproved?.(result)
                                    } catch (e){
                                        if (e instanceof Error) {
                                            setAlertMessage(e.message)
                                            approveModal.closeModal()
                                            setAllowApprove(false)
                                        }
                                    } finally {
                                        setApproving(false)
                                    }
                                }} variant="success" className="w-50" disabled={approving}>{approving ? "Approving..." : "Approve"}</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {/* Move to bin section */}
                {!info.deleted && <Button onClick={binModal.openModal} variant="outline-danger" className="w-100 mt-3">Move to bin</Button>}

                {!info.deleted && (
                    <Modal size="sm" animation={false} show={binModal.isOpen} onHide={binModal.closeModal}>
                        <Modal.Body>
                            <h6 className="text-center">Move dataset to bin?</h6>
                            <div className="d-flex gap-2 mt-3">
                                <Button onClick={binModal.closeModal} variant="outline-secondary" className="w-50">Cancel</Button>
                                <Button autoFocus onClick={async () => {
                                    try {
                                        setRemoving(true)
                                        const result = await datasetService.moveToBin(info.datasetId)
                                        binModal.closeModal()
                                        onMovedToBin?.(result)
                                    } finally {
                                        setRemoving(false)
                                    }
                                }} variant="danger" className="w-50" disabled={removing}>{removing ? "Deleting..." : "Move to Bin"}</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {/* Restore section */}
                {info.deleted && <Button onClick={restoreModal.openModal} variant="primary" className="w-100 mt-3">Restore Dataset</Button>}
                {info.deleted && (
                    <Modal size="sm" animation={false} show={restoreModal.isOpen} onHide={restoreModal.closeModal}>
                        <Modal.Body>
                            <h6 className="text-center">Restore the dataset?</h6>
                            <div className="d-flex gap-2 mt-3">
                                <Button onClick={restoreModal.closeModal} variant="outline-secondary" className="w-50">Cancel</Button>
                                <Button autoFocus onClick={async () => {
                                    try {
                                        setRestoring(true)
                                        const result = await datasetService.restore(info.datasetId)
                                        restoreModal.closeModal()
                                        onRestored?.(result)
                                    } finally {
                                        setRestoring(false)
                                    }
                                }} variant="primary" className="w-50">{restoring ? "Restoring..." : "Restore"}</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                )}

                {/* Delete section */}
                {info.deleted && <Button onClick={deleteModal.openModal} variant="outline-danger" className="w-100 mt-3">Delete Dataset</Button>}
                {info.deleted && (
                    <Modal animation={false} show={deleteModal.isOpen} size="sm" onHide={deleteModal.closeModal}>
                        <Modal.Body>
                            <h6 className="text-center">Delete the dataset?</h6>
                            <div className="d-flex gap-2 mt-3">
                                <Button onClick={deleteModal.closeModal} variant="outline-secondary" className="w-50">Cancel</Button>
                                <Button autoFocus onClick={async () => {
                                    try {
                                        setDeleting(true)
                                        const result = await datasetService.deleteDataset(info.datasetId)
                                        deleteModal.closeModal()
                                        onDeleted?.(result)
                                    } finally {
                                        setDeleting(false)
                                    }
                                }} variant="danger" className="w-50" disabled={deleting}>{deleting ? "Deleting..." : "Delete"}</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                )}
            </RolePermit>

            <Button onClick={goToNext} className="w-100 mt-3" variant="outline-secondary"><ArrowRightIcon size={iconSize} /></Button>
        </>
    )
}

function IntentDetailList(
    {
        isEdit,
        editForm,
        className,
        intents
    }: {
        isEdit: boolean,
        editForm: FormsUtils<DatasetDetail>,
        className?: string,
        intents: DatasetDetailIntent[]

    }) {

    const onIntentIndexChange = (datasetintentId: number, indexType: "start" | "end", index: number) => {
        const form = editForm.form
        editForm.setForm({ ...form, intents: form.intents.map(i => i.datasetintentId === datasetintentId ? { ...i, [`${indexType}Index`]: index } : i) })
    }

    const onNerIndexChange = (datasetintentId: number, datasetintentnerId: number, indexType: "start" | "end", index: number) => {
        const form = editForm.form
        editForm.setForm({
            ...form, intents: form.intents.map(i => (
                i.datasetintentId === datasetintentId ?
                    { ...i, entities: i.entities.map(ent => ent.datasetintentnerId === datasetintentnerId ? { ...ent, [`${indexType}Index`]: index } : ent) } : i))
        })
    }


    return (
        <Accordion className={className}>
            {intents.map((i, idx) => (
                <Accordion.Item key={i.intentId} eventKey={`${idx}`}>
                    <Accordion.Header>
                        <Container fluid className="position-relative">
                            <Row className="gap-1 d-md-flex d-none">
                                <GroupLabelInfo label="Intent" className="col-6 px-0 flex-shrink-0" info={i.label} />
                                {isEdit || (
                                    <>
                                        <GroupLabelInfo label="Start" className="col-2 px-0 flex-shrink-0" info={i.startIndex} />
                                        <GroupLabelInfo label="End" className="col-2 px-0 flex-shrink-0" info={i.endIndex} />
                                    </>
                                )}

                                {isEdit && (
                                    <>
                                        <div className="col-2 px-0">
                                            <Form.Control onClick={e => {
                                                e.stopPropagation()
                                            }} placeholder="Start"
                                                defaultValue={i.startIndex}
                                                onChange={(e) => onIntentIndexChange(i.datasetintentId, "start", Number(e.target.value))} />
                                        </div>
                                        <div className="col-2 px-0">
                                            <Form.Control onClick={e => {
                                                e.stopPropagation()
                                            }} placeholder="End"
                                                defaultValue={i.endIndex}
                                                onChange={(e) => onIntentIndexChange(i.datasetintentId, "end", Number(e.target.value))} />
                                        </div>
                                    </>
                                )}

                            </Row>
                            <Row className="gap-1 d-md-flex d-md-none">
                                <LabelInfo label="Intent" className="col-6 px-0 flex-shrink-0" info={i.label} />
                                {isEdit || (
                                    <>
                                        <LabelInfo label="Start" className="col-2 px-0 flex-shrink-0" info={i.startIndex} />
                                        <LabelInfo label="End" className="col-2 px-0 flex-shrink-0" info={i.endIndex} />
                                    </>
                                )}
                                {isEdit && (
                                    <>
                                        <div className="col-2 px-0 align-self-end">
                                            <Form.Control onClick={e => {
                                                e.stopPropagation()
                                            }} placeholder="Start"
                                                defaultValue={i.startIndex}
                                                onChange={(e) => onIntentIndexChange(i.datasetintentId, "start", Number(e.target.value))} />
                                        </div>
                                        <div className="col-2 px-0 align-self-end">
                                            <Form.Control onClick={e => {
                                                e.stopPropagation()
                                            }} placeholder="End"
                                                defaultValue={i.endIndex}
                                                onChange={(e) => onIntentIndexChange(i.datasetintentId, "end", Number(e.target.value))} />
                                        </div>
                                    </>
                                )}
                            </Row>
                        </Container>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container fluid>
                            {i.entities.map((item, idx) => (
                                <div key={idx}>
                                    <Row className="gap-1 d-md-flex d-none mt-2">
                                        <GroupLabelInfo label="Ner" className="col-5 px-0" info={item.label} />
                                        {isEdit || (
                                            <>
                                                <GroupLabelInfo label="Start" className="col-2 px-0" info={item.startIndex} />
                                                <GroupLabelInfo label="End" className="col-2 px-0" info={item.endIndex} />
                                            </>
                                        )}
                                        {isEdit && (
                                            <>
                                                <div className="col-2 px-0 align-self-end">
                                                    <Form.Control onClick={e => {
                                                        e.stopPropagation()
                                                    }} placeholder="Start"
                                                        defaultValue={item.startIndex}
                                                        onChange={(e) => onNerIndexChange(i.datasetintentId, item.datasetintentnerId, "start", Number(e.target.value))} />
                                                </div>
                                                <div className="col-2 px-0 align-self-end">
                                                    <Form.Control onClick={e => {
                                                        e.stopPropagation()
                                                    }} placeholder="End"
                                                        defaultValue={item.endIndex}
                                                        onChange={(e) => onNerIndexChange(i.datasetintentId, item.datasetintentnerId, "end", Number(e.target.value))} />
                                                </div>
                                            </>
                                        )}

                                    </Row>
                                    <Row className="gap-1 d-md-flex d-md-none">
                                        <LabelInfo className="col-5 px-0" info={item.label} />
                                        {isEdit || (
                                            <>
                                                <LabelInfo className="col-2 px-0" info={item.startIndex} />
                                                <LabelInfo className="col-2 px-0" info={item.endIndex} />
                                            </>
                                        )}
                                        {isEdit && (
                                            <>
                                                <div className="col-2 px-0 align-self-end">
                                                    <Form.Control onClick={e => {
                                                        e.stopPropagation()
                                                    }} placeholder="Start"
                                                        defaultValue={item.startIndex}
                                                        onChange={(e) => onNerIndexChange(i.datasetintentId, item.datasetintentnerId, "start", Number(e.target.value))} />
                                                </div>
                                                <div className="col-2 px-0 align-self-end">
                                                    <Form.Control onClick={e => {
                                                        e.stopPropagation()
                                                    }} placeholder="End"
                                                        defaultValue={item.endIndex}
                                                        onChange={(e) => onNerIndexChange(i.datasetintentId, item.datasetintentnerId, "end", Number(e.target.value))} />
                                                </div>
                                            </>
                                        )}

                                    </Row>
                                </div>
                            ))}
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}