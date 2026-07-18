import { Alert, Button, ButtonGroup, Container, Form, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { Edit2Icon, EyeIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import type { MemberListItem, ProfileResult } from "../../_models/outputs";
import { FormsInput } from "../../_components/ui/forms.input";
import MemberForm from "../../_components/modals/member.form";
import { useModals } from "../../_hooks/use-modals";
import FormsSelect from "../../_components/ui/forms.select";
import { useForms } from "../../_hooks/use-forms";
import type { MemberSearch } from "../../_models/searches";
import * as memberService from "../../services/member.service"
import { useEffect, useState } from "react";
import RolePermit from "../../_components/role-permit";
import MemberDetailModal from "../../_components/modals/member.detail";
import { AppProfile } from "../../_components/app-profile";
import { resolveProfileImage } from "../../services/account.service";

export default function MemberListPage() {
    const modalState = useModals()
    const [loading, setLoading] = useState(true)
    const {onChange, controls, ...form} = useForms<MemberSearch>({keyword: "", role: ""})

    const [members, setMembers] = useState<MemberListItem[]>([])
    useEffect(() => {
        const loadMembers = async () => {
            try {
                const items = await memberService.search()
                setMembers(items)
            } finally {
                setLoading(false)
            }
        }
        loadMembers()
    }, [setMembers])

    const onSearch = async (search?:MemberSearch) => {
        const items = await memberService.search(search)
        setMembers(items)
    }

    const [toEdit, setToEdit] = useState<MemberListItem>()

    const onSaved = async () => {
        modalState.closeModal()
        setToEdit(undefined)
        form.reset()
        await onSearch()
    }

    const viewModal = useModals()
    const [toView, setToView] = useState<ProfileResult>()
    const onView = async (item:MemberListItem) => {
        const result = await memberService.profile(item.memberId)
        setToView(result)
    }

    return (
        <MainContentDecorator title="Members Management">
            {/* Member Add Form */}
            <RolePermit roles={["Admin"]}>
                <MemberForm member={toEdit} state={modalState} onSaved={onSaved} />
            </RolePermit>
            {/* Member Search Form */}
            <Container className="mt-3">
                <Form onSubmit={form.onSubmit(onSearch)} className="row gap-2">
                    <FormsSelect name={controls.role} onChange={onChange} value={form.form.role} className="col-auto px-0" label="Role">
                        <option value="">All</option>
                        <option value={"Collector"}>Collector</option>
                        <option value={"Supervisor"}>Supervisor</option>
                        <option value={"Admin"}>Admin</option>
                    </FormsSelect>
                    <FormsInput name={controls.keyword} onChange={onChange} value={form.form.keyword} className="col-auto px-0" label="Keyword" placeholder="Enter keyword" />
                    <Button type="submit" className="col-auto align-self-end">Search</Button>

                    <RolePermit roles={["Admin"]}>
                        <Button type="button" onClick={() => {
                            modalState.openModal()
                            setToEdit(undefined)
                        }} variant="danger" className="col-auto align-self-end">Add Member</Button>
                    </RolePermit>
                </Form>
            </Container>

            {/* Member List Table */}
            <div className="mt-3 container">
                {!loading && (
                    <Table hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Member</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th className="text-end pe-4">Dataset</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map(i => <MemberListTableRow onView={(item) => {
                                viewModal.openModal()
                                onView(item)
                            }} onEdit={(item) => {
                                setToEdit(item)
                                modalState.openModal()
                            }} key={i.memberId} member={i} />)}
                        </tbody>
                    </Table>
                )}
                <MemberDetailModal modalState={viewModal} profile={toView} />
                {!loading && members.length == 0 && <Alert className="text-center w-100" variant="light">Add a member.</Alert>}
            </div>
        </MainContentDecorator>
    )
}

function MemberListTableRow({member, onEdit, onView}: {member:MemberListItem, onEdit?:(item:MemberListItem) => void, onView?:(item:MemberListItem) => void}) {
    const { memberId, memberProfile, memberName, memberEmail, role, datasets } = member
    return (
        <tr className="align-middle">
            <td>{memberId}</td>
            <td><AppProfile img={resolveProfileImage(memberProfile)} className="me-2" /> {memberName}</td>
            <td>{memberEmail}</td>
            <td>{role}</td>
            <td className="text-end pe-4">{datasets}</td>
            <td>
                <ButtonGroup>
                    <Button onClick={() => {
                        onView?.(member)
                    }} variant="outline-primary" size="sm"><EyeIcon size={iconSize} /></Button>
                    <RolePermit roles={["Admin"]}>
                        <Button onClick={() => {
                            onEdit?.(member)
                        }} variant="outline-primary" size="sm"><Edit2Icon size={iconSize} /></Button>
                    </RolePermit>
                </ButtonGroup>
            </td>
        </tr>
    )
}