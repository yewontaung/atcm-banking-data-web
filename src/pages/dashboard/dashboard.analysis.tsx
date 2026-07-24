import MainContentDecorator from "../../_components/decorators/main-content";
import { Badge, Container, Form, ListGroup } from "react-bootstrap";
import { AppProfile } from "../../_components/app-profile";
import TotalDataCard from "../../_components/totaldata-card";
import * as dashboardService from "../../services/dashboard.service"
import { useEffect, useState } from "react";
import type { CollectRate, DashboardAnalysis, DatasetAnalysis } from "../../_models/outputs";
import { resolveProfileImage } from "../../services/account.service";

export default function DashboardAnalysisPage() {

    const [dashboard, setDashboard] = useState<DashboardAnalysis>()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const loadDashboard = async () => {
            try {
                setLoading(true)
                const result = await dashboardService.analysis()
                setDashboard(result)
            } finally {
                setLoading(false)
            }
        }
        loadDashboard()

    }, [])

    const {datasetMeta, datasetAnalysis, alltimeCollectRate, todayCollectRate, yesterdayCollectRate} = dashboard ?? {}

    return (
        <MainContentDecorator title="Dashboard">
            {/* Total Data Analysis */}
            <Container className="mt-3">
                <div className="row gap-3 justify-content-center justify-content-lg-start">
                    <TotalDataCard label="Dataset" total={datasetMeta?.totalDatasets ?? 0} className="col-auto w-25" />
                    <TotalDataCard label="Intents" total={datasetMeta?.totalIntents ?? 0} className="col-auto w-25" />
                    <TotalDataCard label="Entities" total={datasetMeta?.totalNers ?? 0} className="col-auto w-25" />
                </div>
            </Container>
            <Container className="mt-3">
                <div className="row gap-3">
                    <div className="col-12 col-md-5 px-0">
                        <CollectRateSection alltimeRate={alltimeCollectRate ?? []} todayRate={todayCollectRate ?? []} loading={loading} yesterdayRate={yesterdayCollectRate ?? []}/>
                    </div>
                    <div className="col-12 col-md-5 px-0">
                        <DatasetAnalysisSection analysis={datasetAnalysis} />
                    </div>
                </div>
            </Container>
        </MainContentDecorator>
    )
}

function DatasetAnalysisSection({className, analysis}:{className?:string, analysis?:DatasetAnalysis}) {
    return (
        <div className={`border p-3 ${className}`}>
            <div>
                <h5>Dataset Analysis</h5>
            </div>
            <div className="mt-3">
                <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>Training Dataset</span>
                        <Badge>{analysis?.trainingDatasets ?? 0}</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>Validation Dataset</span>
                        <Badge>{analysis?.validationDatasets ?? 0}</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center">
                        <span>Testing Dataset</span>
                        <Badge>{analysis?.testingDatasets ?? 0}</Badge>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
}

function CollectRateSection({className, todayRate, yesterdayRate, alltimeRate, loading}:{className?:string, todayRate:CollectRate[], yesterdayRate:CollectRate[], alltimeRate:CollectRate[], loading?:boolean}) {

    const [filter, setFilter] = useState<"today" | "yesterday" | "alltime">("today")

    return (
        <div className={`border p-3 ${className}`}>
            <div className="d-flex justify-content-between">
                <h5>Collect Rate</h5>
                <Form.Select value={filter} onChange={e => setFilter(e.target.value as "today" | "yesterday")} size="sm" className="w-auto align-self-start">
                    <option value="alltime">All Time</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                </Form.Select>
            </div>
            <div className="mt-3">
                <ListGroup variant="flush">
                    <ListGroup.Item className="d-flex fw-bold justify-content-between align-items-center">
                        <span>Member</span>
                        <span>Collected Data</span>
                    </ListGroup.Item>

                    {loading && <div className="text-center p-4 rounded">Loading...</div>}

                    {filter === "alltime" && alltimeRate.map(i => (
                        <ListGroup.Item key={i.memberId} className="d-flex justify-content-between align-items-center">
                            <div>
                                <AppProfile img={resolveProfileImage(i.memberProfile)} />
                                <span className="ms-3">{i.memberName}</span>
                            </div>
                            <Badge bg="success">{i.collectedData}</Badge>
                        </ListGroup.Item>
                    ))}


                    {filter === "today" && todayRate.map(i => (
                        <ListGroup.Item key={i.memberId} className="d-flex justify-content-between align-items-center">
                            <div>
                                <AppProfile img={resolveProfileImage(i.memberProfile)} />
                                <span className="ms-3">{i.memberName}</span>
                            </div>
                            <Badge bg="success">{i.collectedData}</Badge>
                        </ListGroup.Item>
                    ))}

                    {filter === "yesterday" && yesterdayRate.map(i => (
                        <ListGroup.Item key={i.memberId} className="d-flex justify-content-between align-items-center">
                            <div>
                                <AppProfile img={resolveProfileImage(i.memberProfile)} />
                                <span className="ms-3">{i.memberName}</span>
                            </div>
                            <Badge bg="success">{i.collectedData}</Badge>
                        </ListGroup.Item>
                    ))}

                </ListGroup>
            </div>
        </div>
    )
}