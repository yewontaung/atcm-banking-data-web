import { Badge, Button, ButtonGroup, Container, Form, Row, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { Edit2Icon, EyeIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import FormsSelect from "../../_components/ui/forms.select";
import InputsGroup from "../../_components/ui/inputs.group";
import { Link } from "react-router-dom";
import Pagination from "../../_components/ui/pagination";

export default function DatasetListPage() {
    return (
        <MainContentDecorator title="Dataset Management">
            {/* Dataset Search Form */}
            <Container className="mt-3">
                <Row className="row-gap-2">
                    <FormsSelect label="Status" className="col-auto px-0">
                        <option>All</option>
                        <option>Pending</option>
                        <option>Reviewd</option>
                    </FormsSelect>
                    <InputsGroup label="Search Strategy" className="col-auto px-auto">
                        <Form.Select className="w-auto" style={{width: "35%"}}>
                            <option>All</option>
                            <option>Intent</option>
                            <option>Collector</option>
                            <option>Command</option>
                        </Form.Select>
                        <Form.Control placeholder="Enter search key" className="w-auto" />
                    </InputsGroup>
                    <Button className="col-auto align-self-end">Search</Button>
                    <Link to="/datasets/add" className="btn btn-danger col-auto align-self-end ms-2">Add Data</Link>
                </Row>
            </Container>
            {/* Dataset List Table */}
            <Container className="mt-3">
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
                        <IntentListItemRow />
                        <IntentListItemRow />
                        <IntentListItemRow />
                    </tbody>
                </Table>
                <Pagination previous={1} next={3} page={5} pages={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} onClick={() => {}} total={10} size={10} sizes={[10, 15, 20]} />
            </Container>
        </MainContentDecorator>
    )
}

function IntentListItemRow() {
    return (
        <tr className="align-middle">
            <td>1</td>
            <td>Transfer 3000 to my mom.</td>
            <td>
                <Badge>Training</Badge>
            </td>
            <td>
                <Badge bg="warning" text="dark">Pending</Badge>
            </td>
            <td>Ye Wont Aung</td>
            <td>12 July, 2026</td>
            <td>
                <ButtonGroup>
                    <Link to="/datasets/12">
                        <Button size="sm" variant="outline-primary"><EyeIcon size={iconSize} /></Button>
                    </Link>
                    <Button size="sm" variant="outline-primary"><Edit2Icon size={iconSize} /></Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}