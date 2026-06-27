import MainContentDecorator from "../../_components/decorators/main-content";
import { Badge, Container, Form, ListGroup } from "react-bootstrap";
import { AppProfile } from "../../_components/app-profile";
import { defaultProfile } from "../../_utils/constants";

export default function DashboardAnalysisPage() {
    return (
        <MainContentDecorator title="Dashboard">
            {/* Total Data Analysis */}
            <Container className="mt-3">
                <div className="row gap-3">
                    <TotalDataCard label="Dataset" total={1000} className="col-auto w-25" />
                    <TotalDataCard label="Intents" total={10} className="col-auto w-25" />
                    <TotalDataCard label="Named Entities" total={20} className="col-auto w-25" />
                </div>
            </Container>
            <Container className="mt-3">
                <div className="row">
                    <div className="col-auto px-0 w-50">
                        <CollectRate />
                    </div>
                    <div className="col-auto w-50">
                        <DatasetAnalysis />
                    </div>
                </div>
            </Container>
        </MainContentDecorator>
    )
}

function DatasetAnalysis({className}:{className?:string}) {
    return (
        <div className={`border p-3 ${className}`}>
            <div>
                <h5>Dataset Analysis</h5>
            </div>
            <div className="mt-3">
                <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>Training Dataset</span>
                        <Badge>500</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>Validation Dataset</span>
                        <Badge>300</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>Testing Dataset</span>
                        <Badge>200</Badge>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
}

function CollectRate({className}:{className?:string}) {
    return (
        <div className={`border p-3 ${className}`}>
            <div className="d-flex justify-content-between">
                <h5>Collect Rate</h5>
                <Form.Select size="sm" className="w-auto align-self-start">
                    <option value={"today"}>Today</option>
                    <option value={"yesterday"}>Yesterday</option>
                </Form.Select>
            </div>
            <div className="mt-3">
                <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex fw-bold justify-content-between align-items-center">
                        <span>Member</span>
                        <span>Collected Data</span>
                    </ListGroup.Item>
                    {[1, 2, 3, 4].map(i => (
                        <ListGroup.Item key={i} className="d-flex justify-content-between align-items-center">
                            <div>
                                <AppProfile img={defaultProfile} />
                                <span className="ms-3">Ye Wont Aung</span>
                            </div>
                            <Badge bg="success">200</Badge>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    )
}

function TotalDataCard({className, label, total}:{className?:string, label?:string, total:number}) {
    return (
        <div className={`border p-3 text-center shadow-sm ${className}`}>
            <h6>{label}</h6>
            <h2>{total}</h2>
        </div>
    )
}