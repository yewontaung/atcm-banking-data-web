import { Badge, Button, ButtonGroup, Container, Modal, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { Edit2Icon, EyeIcon, Trash2Icon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import type { IntentListItem } from "../../_models/outputs";
import { FormsInput } from "../../_components/ui/forms.input";
import IntentFormModal from "../../_components/modals/intent.form";
import { useModals } from "../../_hooks/use-modals";
import { useForms } from "../../_hooks/use-forms";
import type { IntentSearch } from "../../_models/searches";
import { useEffect, useState } from "react";
import * as intentService from "../../services/intent.service"
import { formateDate } from "../../_utils/date-formats";
import RolePermit from "../../_components/role-permit";
import type { IntentEditForm } from "../../_models/schemas";

export default function IntentsListPage() {
    const modalState = useModals()
    const {controls, onChange, ...form} = useForms<IntentSearch>({q: ""})
    const [intents, setIntents] = useState<IntentListItem[]>([])

    useEffect(() => {
        const loadIntents = async () => {
            const items = await intentService.search()
            setIntents(items)
        }
        loadIntents()

    }, [])
    
    const onSearch = async (search?:IntentSearch) => {
        const items = await intentService.search(search)
        setIntents(() => items)
    }

    const onSaved = async () => {
        modalState.closeModal()
        form.reset()
        await onSearch()
    }

    const deleteModal = useModals()
    const [toDelete, setToDelete] = useState<IntentListItem>()

    const editModal = useModals()
    const editForm = useForms<IntentEditForm>({
        intentId: 0, label: "", description: ""
    }, (data, errors) => {
        if(!data.label || data.label === "") {
            errors.label = "Please enter intent label."
        }
        if(!data.description || data.description === "") {
            errors.description = "Please enter intent description."
        } 
    })

    const onEdit = async () => {
        if(!editForm.validate()) return
        const result = await intentService.edit(editForm.form)
        setIntents(intents.filter(i => i.intentId === result.resultData).map(i => ({...i, label: editForm.form.label, description: editForm.form.description})))
        editForm.reset()
        editModal.closeModal()
    }

    return (
        <MainContentDecorator title="Intetns Management">
            <RolePermit roles={["Admin"]}>
                <IntentFormModal state={modalState} onSaved={onSaved} />
            </RolePermit>
            {/* Intent Search */}
            <Container className="mt-3">
                <form onSubmit={form.onSubmit(onSearch)} className="row gap-2">
                    <FormsInput name={controls.q} value={form.form.q} onChange={onChange} label="Keyword" placeholder="Enter keyword" className="col-auto px-0" />
                    <Button type="submit" className="col-auto align-self-end">Search</Button>
                    <RolePermit roles={["Admin"]}>
                        <Button type="button" onClick={modalState.openModal} variant="danger" className="col-auto align-self-end">Add Intent</Button>
                    </RolePermit>
                </form>
            </Container>
            {/* Intent List Table */}
            <Container className="mt-4">
                <Table hover>
                    <thead>
                        <tr className="align-middle">
                            <th>ID</th>
                            <th>Intent</th>
                            <th>Last Updated</th>
                            <th className="text-end pe-3">Dataset</th>
                            <th>Named Entities</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {intents.map(item => <IntentListItemRow key={item.intentId} {...{item}} onDelete={item => {
                            setToDelete(item)
                            deleteModal.openModal()
                        }} onEdit={item => {
                            editForm.setForm({intentId: item.intentId, label: item.label, description: item.description})
                            editModal.openModal()
                        }} />)}
                    </tbody>
                </Table>
                    
                {/* Edit section */}
                <Modal animation={false} show={editModal.isOpen} onHide={() => {
                    editForm.reset()
                    editModal.closeModal()
                }}>
                    <Modal.Header>Edit intent</Modal.Header>
                    <Modal.Body>

                        <form onSubmit={editForm.onSubmit(onEdit)}>
                            <FormsInput className="mb-3" value={editForm.form.label} onChange={editForm.onChange} error={editForm.errors.label} name={editForm.controls.label} label="Intent label" placeholder="Enter intent label" />
                            <FormsInput className="mb-3" as="textarea"  value={editForm.form.description} onChange={editForm.onChange}  name={editForm.controls.description} label="Intent label" placeholder="Enter intent label" />

                            <div className="d-flex justify-content-end gap-3">
                                <Button type="button" onClick={() => {
                                    editForm.reset()
                                    editModal.closeModal()
                                }} variant="outline-secondary">Cancel</Button>
                                <Button type="submit">Save</Button>
                            </div>
                        </form>

                    </Modal.Body>
                </Modal>

                {/* Delete section */}
                <Modal animation={false} show={deleteModal.isOpen} size="sm"
                    onHide={() => {
                        setToDelete(undefined)
                        deleteModal.closeModal()
                    }}>
                    <Modal.Body>
                        <h6 className="text-center">Are you sure to delete the intent?</h6>

                        <div className="d-flex justify-content-center gap-2 mt-3">
                            <Button onClick={() => {
                                setToDelete(undefined)
                                deleteModal.closeModal()
                            }} variant="outline-secondary">Cancel</Button>
                            <Button autoFocus onClick={async () => {
                                console.log("Deleting")
                                if(!toDelete) return
                                const result = await intentService.remove(toDelete?.intentId)
                                setIntents(intents.filter(i => i.intentId !== result.resultData))
                                deleteModal.closeModal()
                                setToDelete(undefined)

                            }} variant="danger">Delete</Button>
                        </div>
                    </Modal.Body>
                </Modal>

            </Container>
        </MainContentDecorator>
    )
}

function IntentListItemRow(
    {item, onDelete, onEdit}
    :{
        item:IntentListItem, 
        onDelete?:(item:IntentListItem) => void,
        onEdit?:(item:IntentListItem) => void
    }) {

    const {intentId, label, lastUpdated, dataset, ners} = item

    return (
        <tr className="align-middle">
            <td>{intentId}</td>
            <td>{label}</td>
            <td>{formateDate(lastUpdated)}</td>
            <td className="text-end pe-3">{dataset}</td>
            <td className="col-3">
                <div className="d-flex gap-2 flex-wrap">
                    {ners && ners.map(item => <Badge key={item.nerId}>{item.label}</Badge>)}
                </div>
            </td>
            <td>
                <ButtonGroup>
                    {/* <Button variant="outline-primary" size="sm"><EyeIcon size={iconSize} /></Button> */}
                    <Button onClick={() => {
                        onEdit?.(item)
                    }} variant="outline-primary" size="sm"><Edit2Icon size={iconSize} /></Button>
                    <RolePermit roles={["Admin"]}>
                        {dataset === 0 && <Button variant="outline-danger" onClick={() => onDelete?.(item)} size="sm"><Trash2Icon size={iconSize} /></Button>}
                    </RolePermit>
                </ButtonGroup>
            </td>
        </tr>
    )
}