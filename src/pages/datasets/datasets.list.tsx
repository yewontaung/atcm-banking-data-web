import { Alert, Badge, Button, ButtonGroup, Container, Form, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { Edit2Icon, EyeIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import FormsSelect from "../../_components/ui/forms.select";
import InputsGroup from "../../_components/ui/inputs.group";
import { Link } from "react-router-dom";
import Pagination from "../../_components/ui/pagination";
import { useEffect, useState } from "react";
import type { DatasetListItem, PaginationResult } from "../../_models/outputs";
import { useForms } from "../../_hooks/use-forms";
import type { DatasetSearch } from "../../_models/searches";
import * as datasetService from "../../services/dataset.service"
import { formateDate } from "../../_utils/date-formats";

export default function DatasetListPage() {

    const [datasets, setDatasets] = useState<PaginationResult<DatasetListItem>>()
    const [loading, setLoading] = useState(true)

    const {controls, onChange, ...form} = useForms<DatasetSearch>({
        keyword: "",
        status: "",
        strategy: "",
        page:1,
        size: 10,
    })

    useEffect(() => {
        const loadDatasets = async () => {
            const result = await datasetService.search()
            setDatasets(result)
            setLoading(false)
        }

        loadDatasets()

    }, [])

    const onSearch = async (search?:DatasetSearch) => {
        console.log(search ?? form.form)
        const result = await datasetService.search(search ?? form.form) 
        setDatasets(result)
    }


    return (
        <MainContentDecorator title="Dataset Management">
            {/* Dataset Search Form */}
            <Container className="mt-3">
                <form onSubmit={form.onSubmit(onSearch)} className="row row-gap-2">
                    <FormsSelect name={controls.status} value={form.form.status} onChange={onChange} label="Status" className="col-auto px-0">
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Reviewd</option>
                    </FormsSelect>
                    <InputsGroup label="Search Strategy" className="col-auto px-auto">
                        <Form.Select name={controls.strategy} value={form.form.strategy} onChange={onChange} className="w-auto" style={{width: "35%"}}>
                            <option value="">All</option>
                            <option value="collector">Collector</option>
                            <option value="command">Command</option>
                        </Form.Select>
                        <Form.Control onChange={onChange} name={controls.keyword} value={form.form.keyword} placeholder="Enter search key" className="w-auto" />
                    </InputsGroup>
                    <Button type="submit" className="col-auto align-self-end">Search</Button>
                    <Link to="/datasets/add" className="btn btn-danger col-auto align-self-end ms-2">Add Data</Link>
                </form>
            </Container>
            {/* Dataset List Table */}
            <Container className="mt-3">
                {!loading && (
                    <>
                        <Table hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Command</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Member</th>
                                    <th>Last Updated</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>

                                {datasets?.items.map(i => <IntentListItemRow item={i} key={i.datasetId} />)}

                            </tbody>
                        </Table>

                        <Pagination onChange={(page, size) => onSearch({...form.form, page, size})} page={datasets?.page ?? 1} total={datasets?.total ?? 0} />
                    </>
                )}


                {!loading && datasets?.items.length == 0 && <Alert className="text-center w-100" variant="light">Add Datasets.</Alert>}

            </Container>
        </MainContentDecorator>
    )
}

function IntentListItemRow({item}:{item:DatasetListItem}) {
    return (
        <tr className="align-middle">
            <td>{item.datasetId}</td>
            <td>{item.command}</td>
            <td>
                <Badge>{item.datasetType}</Badge>
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
                    <Button size="sm" variant="outline-primary"><Edit2Icon size={iconSize} /></Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}