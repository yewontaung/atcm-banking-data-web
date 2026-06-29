import { Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { EyeIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import type { MemberListItem } from "../../_models/outputs";
import { FormsInput } from "../../_components/ui/forms.input";
import MemberForm from "../../_components/modals/member.form";
import { useModals } from "../../_hooks/use-modals";
import FormsSelect from "../../_components/ui/forms.select";

export default function MemberListPage() {
    const modalState = useModals()
    return (
        <MainContentDecorator title="Members Management">
            {/* Member Add Form */}
            <MemberForm {...modalState} />
            {/* Member Search Form */}
            <Container className="mt-3">
                <Row className="gap-2">
                    <FormsSelect className="col-auto px-0" label="Role">
                        <option value={"all"}>All</option>
                        <option value={"collector"}>Collector</option>
                        <option value={"supervisor"}>Supervisor</option>
                        <option value={"admin"}>Admin</option>
                    </FormsSelect>
                    <FormsInput className="col-auto px-0" label="Keyword" placeholder="Enter keyword" />
                    <Button className="col-auto align-self-end">Search</Button>
                    <Button onClick={modalState.openModal} variant="danger" className="col-auto align-self-end">Add Member</Button>
                </Row>
            </Container>

            {/* Member List Table */}
            <div className="mt-3 container">
                <Table hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Dataset</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13].map(i => <MemberListTableRow key={i} id={1} name="Ye Wont Aung" email="yewontaung@gmail.com" role="admin" dataset={100} />)}
                        
                    </tbody>
                </Table>
            </div>
        </MainContentDecorator>
    )
}

function MemberListTableRow({ id, name, email, role, dataset }: MemberListItem) {
    return (
        <tr className="align-middle">
            <td>{id}</td>
            <td>{name}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>{dataset}</td>
            <td>
                <ButtonGroup>
                    <Button variant="outline-primary" size="sm"><EyeIcon size={iconSize} /></Button>
                    <Button variant="outline-primary" size="sm"><EyeIcon size={iconSize} /></Button>
                </ButtonGroup>
            </td>
        </tr>
    )
}