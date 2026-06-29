import { Badge, Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { Edit2Icon, EyeIcon } from "lucide-react";
import { iconSize, intentItemSeed } from "../../_utils/constants";
import type { IntentListItem } from "../../_models/outputs";
import { FormsInput } from "../../_components/ui/forms.input";
import IntentForm from "../../_components/modals/intent.form";
import { useModals } from "../../_hooks/use-modals";

export default function IntentsListPage() {
    const modalState = useModals()
    return (
        <MainContentDecorator title="Intetns Management">
            <IntentForm {...modalState} />
            {/* Intent Search */}
            <Container className="mt-3">
                <Row className="gap-2">
                    <FormsInput label="Keyword" placeholder="Enter keyword" className="col-auto px-0" />
                    <Button className="col-auto align-self-end">Search</Button>
                    <Button onClick={modalState.openModal} variant="danger" className="col-auto align-self-end">Add Intent</Button>
                </Row>
            </Container>
            {/* Intent List Table */}
            <Container className="mt-4">
                <Table hover>
                    <thead>
                        <tr className="align-middle">
                            <th>ID</th>
                            <th>Intent</th>
                            <th>Last Update</th>
                            <th>Dataset</th>
                            <th>Named Entities</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {intentItemSeed.map(item => <IntentListItemRow key={item.id} {...item} />)}
                    </tbody>
                </Table>
            </Container>
        </MainContentDecorator>
    )
}

function IntentListItemRow({id, intent, lastUpdated, dataset, namedEntities}:IntentListItem) {
    return (
        <tr className="align-middle">
            <td>{id}</td>
            <td>{intent}</td>
            <td>{lastUpdated.toDateString()}</td>
            <td>{dataset}</td>
            <td className="col-3">
                <div className="d-flex gap-2 flex-wrap">
                    {namedEntities && namedEntities.map(item => <Badge key={item.id}>{item.label}</Badge>)}
                </div>
            </td>
            <td>
                <ButtonGroup>
                    <Button variant="outline-primary" size="sm"><EyeIcon size={iconSize} /></Button>
                    <Button variant="outline-primary" size="sm"><Edit2Icon size={iconSize} /></Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}