import { Button, Card, Container, Row } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import type { DatasetAnalysis, DatasetType } from "../../_models/outputs";
import { DownloadIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import { useEffect, useState } from "react";
import * as datasetService from "../../services/dataset.service"

export default function DatasetExportPage() {
    const [datasets, setDatasets] = useState<DatasetAnalysis>({
        trainingDatasets: 0,
        validationDatasets: 0,
        testingDatasets: 0
    })

    useEffect(() => {
        const loadAnalysis = async () => {
            const result = await datasetService.analysis()
            setDatasets(result)
        }
        loadAnalysis()
    }, [])


    return (
        <MainContentDecorator title="Export Dataset">
            <Container className="mt-3 p-4">
                <Row className="justify-content-center">
                    <div className="col-3">
                        <DatasetTypeSelectCard className="border border-primary" title="Training Dataset" datasetType={"Training"} total={datasets.trainingDatasets} />
                    </div>
                    <div className="col-3">
                        <DatasetTypeSelectCard className="border border-info" title="Testing Dataset" datasetType={"Testing"} total={datasets.testingDatasets} />
                    </div>
                    <div className="col-3">
                        <DatasetTypeSelectCard className="border border-secondary" title="Validation Dataset" datasetType={"Validation"} total={datasets.validationDatasets} />
                    </div>
                </Row>
            </Container>
        </MainContentDecorator>
    )
}

const DatasetTypeSelectCard = ({title, datasetType, total, className}:{title:string, datasetType:DatasetType, total:number, className?:string}) => {

    const onDownload = async () => {
        await datasetService.download(datasetType)
    }

    return (
        <Card className={` ${className}`}>
            <Card.Header className="text-center">{title}</Card.Header>
            <Card.Body>
                <small className="text-success-emphasis text-center d-block">Total approves</small>
                <h2 className="text-center my-3 mt-2">{total}</h2>
                <Button className="w-100 mx-auto d-block" onClick={onDownload}><DownloadIcon className="me-3" size={iconSize} /> Download</Button>
            </Card.Body>
        </Card>
    )
}