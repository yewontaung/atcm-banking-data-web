import { Alert, Button, ButtonGroup, Container, Modal, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { FormsInput } from "../../_components/ui/forms.input";
import { Edit2Icon, TrashIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import NERForm from "../../_components/modals/ner.form";
import { useModals } from "../../_hooks/use-modals";
import { useEffect, useState } from "react";
import * as nersService from "../../services/ner.service"
import { useForms } from "../../_hooks/use-forms";
import type { NerSearch } from "../../_models/searches";
import type { NerListItem } from "../../_models/outputs";
import RolePermit from "../../_components/role-permit";
import { formateDate } from "../../_utils/date-formats";
import NEREditModal from "../../_components/modals/ner.edit";
import type { NerForm } from "../../_models/schemas";

export default function NersListPage() {
    const state = useModals()
    const [loading, setLoading] = useState(true)
    const [ners, setNers] = useState<NerListItem[]>([])

    const { controls, ...form } = useForms<NerSearch>({ q: "" })

    useEffect(() => {
        const loadNers = async () => {
            try {
                const items = await nersService.search()
                setNers(items)
            } finally {
                setLoading(false)
            }
        }
        loadNers()
    }, [])

    const onSearch = async (search?: NerSearch) => {
        const items = await nersService.search(search)
        setNers(items)
    }

    const onSaved = async () => {
        state.closeModal()
        form.reset()
        await onSearch()
    }

    const deleteModal = useModals()
    const [toDelete, setToDelete] = useState<NerListItem>()

    const remove = async () => {
        if (!toDelete) return
        try {
            const result = await nersService.remove(toDelete.nerId)
            setNers(ners.filter(i => i.nerId !== result.resultData))
        } catch (e) {
            console.log(e)
        }
    }

    const editModal = useModals()
    const [toEdit, setToEdit] = useState<NerListItem>()


    const edit = async (form:NerForm) => {
        if(!toEdit) return
        try {
            const result = await nersService.edit(toEdit.nerId,form)
            setNers(ners.map(i => i.nerId !== result.resultData ? i : {...i, label: form.label}))
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainContentDecorator title="Named Entities Management">
            <Container className="mt-3">
                {/* Search NER Form */}
                <form onSubmit={form.onSubmit(onSearch)} className="row gap-2">
                    <FormsInput onChange={form.onChange} name={controls.q} value={form.form.q} className="col-auto px-0" label="Keyword" placeholder="Enter keyword" />
                    <Button type="submit" className="align-self-end col-auto">Search</Button>
                    <RolePermit roles={["Admin"]}>
                        <Button type="button" onClick={state.openModal} variant="danger" className="align-self-end col-auto">Add Named Entity</Button>
                    </RolePermit>
                </form>
            </Container>
            <RolePermit roles={["Admin"]}>
                <NERForm onSaved={onSaved} state={state} />
            </RolePermit>
            <Container className="mt-3">
                {/* NER List Table */}

                {!loading && (
                    <Table hover>
                        <thead>
                            <tr className="align-middle">
                                <th>ID</th>
                                <th>Label</th>
                                <th>Last Updated</th>
                                <th className="text-end pe-4">Intends</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {ners.map(i => (
                                <tr key={i.nerId} className="align-middle">
                                    <td>{i.nerId}</td>
                                    <td>{i.label}</td>
                                    <td>{formateDate(i.lastUpdated)}</td>
                                    <td className="text-end pe-4">{i.intents}</td>
                                    <td>
                                            <RolePermit roles={["Admin"]}>
                                                <ButtonGroup>
                                                    <Button onClick={() => {
                                                        setToEdit(i)
                                                        editModal.openModal()
                                                    }} size="sm" variant="outline-primary"><Edit2Icon size={iconSize} /></Button>
                                                    {i.intents === 0 && (
                                                        <Button onClick={() => {
                                                            setToDelete(i)
                                                            deleteModal.openModal()
                                                        }} size="sm" variant="outline-danger"><TrashIcon size={iconSize} /></Button>
                                                    )}
                                                </ButtonGroup>
                                            </RolePermit>
                                        </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
                {!loading && ners.length == 0 && <Alert className="text-center w-100" variant="light">Add named enities.</Alert>}

                {/* Ner Edit Section */}
                <NEREditModal item={toEdit} onEdit={async (form) => {
                    await edit(form)
                    setToEdit(undefined)
                    editModal.closeModal()
                }} state={editModal} />

                {/* Ner Delete Section */}
                <Modal animation={false} size="sm" show={deleteModal.isOpen} onHide={() => {
                    setToDelete(undefined)
                    deleteModal.closeModal()
                }}>
                    <Modal.Body>
                        <div className="mb-3 text-center">
                            Delete the Named Entity
                        </div>
                        <div className="d-flex gap-3">
                            <Button onClick={() => {
                                setToDelete(undefined)
                                deleteModal.closeModal()
                            }} variant="outline-secondary" className="w-50">Cancel</Button>
                            <Button autoFocus onClick={async () => {
                                await remove()
                                setToDelete(undefined)
                                deleteModal.closeModal()
                            }} variant="danger" className="w-50">Delete</Button>
                        </div>
                    </Modal.Body>
                </Modal>

            </Container>
        </MainContentDecorator>
    )
}