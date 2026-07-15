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

    return (
        <MainContentDecorator title="Intetns Management">
            <IntentFormModal state={modalState} onSaved={onSaved} />
            {/* Intent Search */}
            <Container className="mt-3">
                <form onSubmit={form.onSubmit(onSearch)} className="row gap-2">
                    <FormsInput name={controls.q} value={form.form.q} onChange={onChange} label="Keyword" placeholder="Enter keyword" className="col-auto px-0" />
                    <Button type="submit" className="col-auto align-self-end">Search</Button>
                    <Button type="button" onClick={modalState.openModal} variant="danger" className="col-auto align-self-end">Add Intent</Button>
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
                        }} />)}
                    </tbody>
                </Table>

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
                            <Button onClick={async () => {
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

function IntentListItemRow({item, onDelete}:{item:IntentListItem, onDelete?:(item:IntentListItem) => void}) {

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
                    <Button variant="outline-primary" size="sm"><EyeIcon size={iconSize} /></Button>
                    <Button variant="outline-primary" size="sm"><Edit2Icon size={iconSize} /></Button>
                    {dataset === 0 && <Button variant="outline-danger" onClick={() => onDelete?.(item)} size="sm"><Trash2Icon size={iconSize} /></Button>}
                </ButtonGroup>
            </td>
        </tr>
    )
}