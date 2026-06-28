import MainContentDecorator from "../../_components/decorators/main-content"
import { Accordion, Badge, Button, Container, Row, Tab, Tabs } from "react-bootstrap"
import { GroupLabelInfo } from "../../_components/label-info"
import { Calendar1Icon, ClipboardIcon, TagIcon, TriangleAlertIcon, User2Icon } from "lucide-react"
import { demoDataset, iconSize } from "../../_utils/constants"
import type { DatasetDetail, DatasetIntentData, NERAlignmentData } from "../../_models/outputs"
import JsonView from "@microlink/react-json-view"

export default function DatasetDetailPage() {
    return (
        <MainContentDecorator title="Dataset Detail">
            <Tabs defaultActiveKey="info-view">
                <Tab eventKey="info-view" title="Information View">
                    <DefaultDatasetView dataset={demoDataset} />
                    <Button variant="success" className="w-100 mt-3">Approve Dataset</Button>
                </Tab>
                <Tab eventKey="json-view" title="Json View">
                    <JsonDatasetView dataset={demoDataset} />
                </Tab>
            </Tabs>
        </MainContentDecorator>
    )
}

function JsonDatasetView({dataset}:{dataset:DatasetDetail}) {
    return (
        <Container className="p-3">
            <Row>
                <div className="col-8">
                    <div className="h-100 border">
                        <div className="bg-body-tertiary justify-content-between align-items-center d-flex p-1">
                            <span className="fs-6 fw-semibold px-2">Json data</span>
                            <Button variant="link"><ClipboardIcon size={iconSize} /></Button>
                        </div>
                        <div className="p-2 overflow-scroll" style={{maxHeight: 600}}>
                            <JsonView 
                                src={dataset} 
                                name="dataset" 
                                enableClipboard={false} 
                                displayDataTypes={false}
                                theme="ocean"
                                style={{
                                    fontFamily: '"JetBrains Mono"',
                                    fontSize: 12,
                                }} />
                        </div>
                    </div>
                </div>
                <div className="col-auto flex-grow-1">
                    <MetadataCard />
                    <Button variant="success" className="w-100 mt-3">Approve Dataset</Button>
                </div>
            </Row>
        </Container>
    )
}

function DefaultDatasetView({dataset}:{dataset:DatasetDetail}) {
    return (
        <Container className="p-3">
            <Row>
                <div className="col-7">
                    <div className="border p-3">
                        <label>User Command</label>
                        <hr />
                        <p className="p-2 mt-2">{dataset.command}</p>
                    </div>
                </div>
                <div className="col-auto flex-grow-1">
                    <MetadataCard />
                </div>
            </Row>
            <IntentDetailList intents={dataset.intents} alignments={dataset.alignments} className="mt-3" />
        </Container>
    )
}

function MetadataCard() {
    return (
        <div className="border p-3 d-flex flex-column row-gap-3">
            <div><User2Icon size={iconSize} className="me-3" /> Ye Wont Aung</div>
            <div><TagIcon size={iconSize} className="me-3" /> Collector</div>
            <div><TriangleAlertIcon size={iconSize} className="me-3" /> <Badge bg="warning" text="dark">Pending</Badge></div>
            <div><Calendar1Icon size={iconSize} className="me-3" /> 12 July, 2026</div>
        </div>
    )
}

function IntentDetailList({ className, intents, alignments }: { className?: string, intents:DatasetIntentData[], alignments:NERAlignmentData[] }) {
    return (
        <Accordion className={className}>
            {intents.map(i => (
                <Accordion.Item key={i.id} eventKey={`${i.id}`}>
                    <Accordion.Header>
                        <Container fluid className="position-relative">
                            <Row className="gap-1">
                                <GroupLabelInfo label="Intent" className="col-4 px-0" info="transfer_fund" />
                                <GroupLabelInfo label="Start" className="col-2 px-0" info="10" />
                                <GroupLabelInfo label="End" className="col-2 px-0" info="20" />
                            </Row>
                        </Container>
                    </Accordion.Header>
                    <Accordion.Body>
                        <Container fluid>
                            {alignments.filter(a => a.intentId === i.id).map((item) => (
                                <Row key={item.id} className="gap-1 mt-2">
                                    <GroupLabelInfo label="NER" className="col-4 px-0" info={item.label} />
                                    <GroupLabelInfo label="Start" className="col-2 px-0" info={item.start} />
                                    <GroupLabelInfo label="End" className="col-2 px-0" info={item.end} />
                                </Row>
                            ))}
                        </Container>
                    </Accordion.Body>
                </Accordion.Item>
            ))}
        </Accordion>
    )
}