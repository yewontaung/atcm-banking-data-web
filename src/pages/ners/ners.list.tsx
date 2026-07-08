import { Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { FormsInput } from "../../_components/ui/forms.input";
import { Edit2Icon, TrashIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import NERForm from "../../_components/modals/ner.form";
import { useModals } from "../../_hooks/use-modals";

export default function NersListPage() {
    const state = useModals()
    return (
        <MainContentDecorator title="Named Entities Management">
            <Container className="mt-3">
                {/* Search NER Form */}
                <Row className="gap-2">
                    <FormsInput className="col-auto px-0" label="Keyword" placeholder="Enter keyword" />
                    <Button className="align-self-end col-auto">Search</Button>
                    <Button type="button" onClick={state.openModal} variant="danger" className="align-self-end col-auto">Add Named Entity</Button>
                </Row>
            </Container>
            <NERForm state={state} />

            <Container className="mt-3">
                {/* NER List Table */}
                <Row>
                    <Table hover>
                        <thead>
                            <tr className="align-middle">
                                <th>ID</th>
                                <th>Label</th>
                                <th>Last Updated</th>
                                <th>Intends</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="align-middle">
                                <td>1</td>
                                <td>To_ACCOUNT_ID</td>
                                <td>12 July, 2026</td>
                                <td>5</td>
                                <td>
                                    <ButtonGroup>
                                        <Button size="sm" variant="outline-primary"><Edit2Icon size={iconSize} /></Button>
                                        <Button size="sm" variant="outline-danger"><TrashIcon size={iconSize} /></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </Container>
        </MainContentDecorator>
    )
}