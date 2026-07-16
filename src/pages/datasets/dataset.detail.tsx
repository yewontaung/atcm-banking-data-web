import MainContentDecorator from "../../_components/decorators/main-content"
import { Accordion, Badge, Button, Container, Modal, Row, Tab, Tabs } from "react-bootstrap"
import { GroupLabelInfo } from "../../_components/label-info"
import { Calendar1Icon, InfoIcon, TagIcon, TriangleAlertIcon, User2Icon } from "lucide-react"
import { iconSize } from "../../_utils/constants"
import type { DatasetDetailIntent, DatasetDetailResult, DatasetInfo, DatasetIntentNerAlignment, ModificationResult } from "../../_models/outputs"
import { AppJsonView } from "../../_components/app-jsonview"
import { useEffect, useState } from "react"
import { formateDate } from "../../_utils/date-formats"
import * as datasetService from "../../services/dataset.service"
import { useNavigate, useParams } from "react-router-dom"
import { useModals } from "../../_hooks/use-modals"
import RolePermit from "../../_components/role-permit"
import CopyBtn from "../../_components/copy-btn"

type DatasetActionHandler = {
    onApproved?:(result:ModificationResult<number>) => void,
    onRestored?:(result:ModificationResult<number>) => void,
    onDeleted?:(result:ModificationResult<number>) => void,
    onMovedToBin?:(result:ModificationResult<number>) => void,
}

export default function DatasetDetailPage() {

    const navigate = useNavigate()
    const {datasetId} = useParams<"datasetId">()
    
    const [detailResult, setDetailResult] = useState<DatasetDetailResult>()

    useEffect(() => {
        console.log(datasetId)
        const loadDetailResult = async () => {
            if(!datasetId) return
            const result = await datasetService.findById(Number(datasetId))
            setDetailResult(result)
        }

        loadDetailResult()

    }, [datasetId])

    const onApproved = () => {
        setDetailResult(detailResult ? {...detailResult, info: {...detailResult.info, approved: true}} : detailResult)
    }

    const onRestored = () => {
        setDetailResult(detailResult ? {...detailResult, info: {...detailResult.info, deleted: false}} : detailResult)
    }

    const onDeleted = () => {
        navigate("/datasets/bin")
    }

    const onMovedToBin = () => {
        setDetailResult(detailResult ? {...detailResult, info: {...detailResult.info, deleted: true}} : detailResult)
    }

    const handlers = {onApproved, onMovedToBin, onRestored, onDeleted}

    return (
        <MainContentDecorator title="Dataset Detail">
            <Tabs defaultActiveKey="info-view">
                <Tab eventKey="info-view" title="Information View">
                    {detailResult && <DefaultDatasetView handlers={handlers} detailResult={detailResult} />}
                </Tab>
                <Tab eventKey="json-view" title="Json View">
                    {detailResult && <JsonDatasetView handlers={handlers} detailResult={detailResult} />}
                </Tab>
            </Tabs>
        </MainContentDecorator>
    )
}

function JsonDatasetView({detailResult:{info, dataset}, handlers}:{detailResult:DatasetDetailResult, handlers?:DatasetActionHandler}) {
    return (
        <Container className="p-2">
            <Row>
                <div className="col-8">
                    <div className="h-100 position-relative border">
                        <CopyBtn className="z-3 position-absolute end-0 me-4" onCopy={() => window.navigator.clipboard.writeText(JSON.stringify(dataset))} />                        
                        <div className="overflow-y-auto overflow-x-auto" style={{maxHeight: 500}}>
                            <AppJsonView name="dataset" data={dataset}  />
                        </div>
                    </div>
                </div>
                <div className="col-auto flex-grow-1">
                    <MetadataCard {...handlers} info={info} />
                </div>
            </Row>
        </Container>
    )
}

function DefaultDatasetView({detailResult:{info, dataset}, handlers}:{detailResult:DatasetDetailResult, handlers?:DatasetActionHandler}) {
    return (
        <Container className="p-3">
            <Row>
                <div className="col-8">
                    <div className="border p-3">
                        <label>User Command</label>
                        <hr />
                        <p className="p-2 mt-2">{dataset.command}</p>
                    </div>
                    <IntentDetailList intents={dataset.intents} alignments={dataset.alignments} className="mt-3" />
                </div>
                <div className="col-auto flex-grow-1">
                    <MetadataCard {...handlers} info={info} />
                </div>
            </Row>
        </Container>
    )
}

function MetadataCard(
    {info, onApproved, onRestored, onDeleted, onMovedToBin}
    :{
        info:DatasetInfo, 
        onApproved?:(result:ModificationResult<number>) => void,
        onRestored?:(result:ModificationResult<number>) => void,
        onDeleted?:(result:ModificationResult<number>) => void,
        onMovedToBin?:(result:ModificationResult<number>) => void,
    }) {

    const approveModal = useModals()
    const restoreModal = useModals()
    const deleteModal = useModals()
    const binModal = useModals()

    return (
        <>
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
                {!info.approved && !info.deleted && <Button onClick={approveModal.openModal} variant="success" className="w-100 mt-3">Approve Dataset</Button>}
                {!info.approved && !info.deleted && (
                    <Modal size="sm" animation={false} show={approveModal.isOpen} onHide={approveModal.closeModal}>
                        <Modal.Body>
                            <h6 className="text-center">Approve the dataset?</h6>
                            <div className="d-flex gap-2 mt-3">
                                <Button onClick={approveModal.closeModal} variant="outline-secondary" className="w-50">Cancel</Button>
                                <Button autoFocus onClick={async () => {
                                    const result = await datasetService.approve(info.datasetId)
                                    approveModal.closeModal()
                                    onApproved?.(result)
                                }} variant="success" className="w-50">Approve</Button>
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
                                    const result = await datasetService.moveToBin(info.datasetId)
                                    binModal.closeModal()
                                    onMovedToBin?.(result)
                                }} variant="danger" className="w-50">Move to Bin</Button>
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
                                    const result = await datasetService.restore(info.datasetId)
                                    restoreModal.closeModal()
                                    onRestored?.(result)
                                }} variant="primary" className="w-50">Restore</Button>
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
                                    const result = await datasetService.deleteDataset(info.datasetId)
                                    deleteModal.closeModal()
                                    onDeleted?.(result)
                                }} variant="danger" className="w-50">Delete</Button>
                            </div>
                        </Modal.Body>
                    </Modal>
                )}
            </RolePermit>

        </>
    )
}

function IntentDetailList({ className, intents, alignments }: { className?: string, intents:DatasetDetailIntent[], alignments:DatasetIntentNerAlignment[] }) {
    return (
        <Accordion className={className}>
            {intents.map(i => (
                <Accordion.Item key={i.intentId} eventKey={`${i.intentId}`}>
                    <Accordion.Header>
                        <Container fluid className="position-relative">
                            <Row className="gap-1">
                                <GroupLabelInfo label="Intent" className="col-6 px-0" info="transfer_fund" />
                                <GroupLabelInfo label="Start" className="col-2 px-0" info="10" />
                                <GroupLabelInfo label="End" className="col-2 px-0" info="20" />
                            </Row>
                        </Container>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container fluid>
                            {alignments.filter(a => a.intentId === i.intentId).map((item) => (
                                <Row key={item.nerId} className="gap-1 mt-2">
                                    <GroupLabelInfo label="Ner" className="col-5 px-0" info={item.label} />
                                    <GroupLabelInfo label="Start" className="col-2 px-0" info={item.startIndex} />
                                    <GroupLabelInfo label="End" className="col-2 px-0" info={item.endIndex} />
                                </Row>
                            ))}
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}