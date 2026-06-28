import { Badge, Button, ButtonGroup, Container, Form, Row, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import SquareBadge from "../../_components/square-badge";
import { Edit2Icon, EyeIcon } from "lucide-react";
import { defaultProfile, iconSize } from "../../_utils/constants";
import { AppProfile } from "../../_components/app-profile";
import AppTooltip from "../../_components/app-tooltip";
import FormsSelect from "../../_components/ui/forms.select";
import InputsGroup from "../../_components/ui/inputs.group";
import { Link } from "react-router-dom";

export default function DatasetListPage() {
    return (
        <MainContentDecorator title="Dataset Management">
            {/* Dataset Search Form */}
            <Container className="mt-3">
                <Row>
                    <FormsSelect label="Status" className="col-auto px-0">
                        <option>All</option>
                        <option>Pending</option>
                        <option>Reviewd</option>
                    </FormsSelect>
                    <InputsGroup label="Search Strategy" className="col-auto px-auto">
                        <Form.Select style={{width: "35%"}}>
                            <option>All</option>
                            <option>Intent</option>
                            <option>Collector</option>
                            <option>Command</option>
                        </Form.Select>
                        <Form.Control placeholder="Enter search key" className="w-auto" />
                    </InputsGroup>
                    <Button className="col-auto align-self-end">Search</Button>
                    <Link to={""} className="btn btn-danger col-auto align-self-end ms-2">Add Data</Link>
                </Row>
            </Container>
            {/* Dataset List Table */}
            <Container className="mt-3">
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Command</th>
                            <th>Intents</th>
                            <th className="text-center">Member</th>
                            <th>Status</th>
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
            </Container>
        </MainContentDecorator>
    )
}

function IntentListItemRow() {
    return (
        <tr className="align-middle">
            <td>1</td>
            <td>Transfer 3000 to my mom.</td>
            <td className="col-4">
                <div className="d-flex gap-1 flex-wrap">
                    <SquareBadge text="transfer_fund" />
                    <SquareBadge text="find_account" />
                    <SquareBadge text="transfer_fund" />
                    <SquareBadge text="find_account" />
                    <SquareBadge text="transfer_fund" />
                </div>
            </td>
            <td className="text-center">
                <AppTooltip id="" title="Ye Wont Aung">
                    <AppProfile img={defaultProfile} />
                </AppTooltip>
            </td>
            <td>
                <Badge bg="warning" text="dark">Pending</Badge>
            </td>
            <td>12 July, 2026</td>
            <td>
                <ButtonGroup>
                    <Button size="sm" variant="outline-primary"><EyeIcon size={iconSize} /></Button>
                    <Button size="sm" variant="outline-primary"><Edit2Icon size={iconSize} /></Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}