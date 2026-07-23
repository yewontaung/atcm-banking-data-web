import { useEffect, useState } from "react";
import MainContentDecorator from "../../_components/decorators/main-content";
import { Alert, Badge, Button, ButtonGroup, Container, Modal, Table } from "react-bootstrap";
import type { DatasetListItem, PaginationResult } from "../../_models/outputs";
import { formateDate } from "../../_utils/date-formats";
import { Link } from "react-router-dom";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import { useModals } from "../../_hooks/use-modals";
import Pagination from "../../_components/ui/pagination";
import * as datasetService from "../../services/dataset.service"
import { AppLoading } from "../../_components/app-loading";

export default function DatasetBinPage() {

    const [loading, setLoading] = useState(true)
    const [datasets, setDatasets] = useState<PaginationResult<DatasetListItem>>()
    const [toDelete, setToDelete] = useState<DatasetListItem>()
    const deleteModal = useModals()
    const [deleting, setDeleting] = useState(false)
    const [pageInfo, setPageInfo] = useState<{ page: number, size: number }>({ page: 1, size: 10 })

    useEffect(() => {
        const loadDasetBin = async () => {
            const result = await datasetService.getBin(pageInfo.page, pageInfo.size)
            setDatasets(result)
            setLoading(false)
        }
        loadDasetBin()
    }, [pageInfo])

    return (
        <MainContentDecorator title="Recycle Bin">

            {/* Dataset List Table */}
            <Container className="mt-3">
                <Table responsive hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Command</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Member</th>
                            <th>Updated</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>

                        {datasets?.items.map(i => <DatasetListItemRow onDelete={(item) => {
                            setToDelete(item)
                            deleteModal.openModal()
                        }} item={i} key={i.datasetId} />)}

                    </tbody>
                </Table>

                {loading && <AppLoading />}

                {datasets && datasets.total > 0 && <Pagination onChange={(page, size) => setPageInfo({ page:size === datasets.size ? page : 1, size:size })} page={datasets?.page ?? 1} total={datasets?.total ?? 0} />}

                <Modal size="sm" animation={false} show={deleteModal.isOpen}
                    onHide={() => {
                        setToDelete(undefined)
                        deleteModal.closeModal()
                    }}>
                    <Modal.Body>
                        <h6>Are you sure to delete the dataset?</h6>
                        <div className="d-flex justify-content-center gap-3 mt-4">
                            <Button onClick={() => {
                                setToDelete(undefined)
                                deleteModal.closeModal()
                            }} variant="outline-secondary" className="w-50">Cancel</Button>

                            <Button autoFocus onClick={async () => {
                                if (!toDelete) return
                                try {
                                    setDeleting(true)

                                    const result = await datasetService.deleteDataset(toDelete.datasetId)

                                    setDatasets(prev => (prev ? { ...prev, total: prev.total - 1, items: prev.items.filter(i => i.datasetId !== result.resultData) } : prev))

                                    setToDelete(undefined)
                                    deleteModal.closeModal()
                                } finally {
                                    setDeleting(false)
                                }
                            }} variant="danger" className="w-50" disabled={deleting}>{deleting ? "Deleting..." : "Delete"}</Button>
                        </div>
                    </Modal.Body>
                </Modal>

                {!loading && datasets?.items.length == 0 && <Alert className="text-center w-100" variant="light">No datasets in bin.</Alert>}

            </Container>

        </MainContentDecorator>
    )
}

function DatasetListItemRow({ item, onDelete }: { item: DatasetListItem, onDelete?: (item: DatasetListItem) => void }) {
    return (
        <tr className="align-middle">
            <td>{item.datasetId}</td>
            <td className="text-truncate" style={{ maxWidth: 250, }}>{item.command}</td>
            <td>
                {item.datasetType === "Training" && <Badge>{item.datasetType}</Badge>}
                {item.datasetType === "Validation" && <Badge bg="secondary" text="white">{item.datasetType}</Badge>}
                {item.datasetType === "Testing" && <Badge bg="info" text="dark">{item.datasetType}</Badge>}
            </td>
            <td>
                {item.approved && <Badge bg="success" text="white">Approved</Badge>}
                {!item.approved && <Badge bg="warning" text="dark">Pending</Badge>}
            </td>
            <td>{item.memberName}</td>
            <td>{formateDate(item.lastUpdated)}</td>
            <td>
                <ButtonGroup>
                    <Link to={`/datasets/${item.datasetId}`}>
                        <Button size="sm" variant="outline-primary"><EyeIcon size={iconSize} /></Button>
                    </Link>
                    <Button onClick={() => onDelete?.(item)} size="sm" variant="outline-danger"><Trash2Icon size={iconSize} /></Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}