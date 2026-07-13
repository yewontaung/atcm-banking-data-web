import { Badge, Button, ButtonGroup, Container, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { Edit2Icon, EyeIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import type { IntentListItem } from "../../_models/outputs";
import { FormsInput } from "../../_components/ui/forms.input";
import IntentFormModal from "../../_components/modals/intent.form";
import { useModals } from "../../_hooks/use-modals";
import { useForms } from "../../_hooks/use-forms";
import type { IntentSearch } from "../../_models/searches";
import { useEffect, useState } from "react";
import * as intentService from "../../services/intents.service"
import { formateDate } from "../../_utils/date-formats";

export default function IntentsListPage() {
    const modalState = useModals()
    const {controls, onChange, ...form} = useForms<IntentSearch>({q: ""})
    const [intents, setIntents] = useState<IntentListItem[]>([])

    console.log("Render")

    useEffect(() => {
        const loadIntents = async () => {
            const items = await intentService.search()
            setIntents(items)
        }
        console.log("Mounted")
        loadIntents()

        return () => console.log("Unmounted")
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
                            <th>Dataset</th>
                            <th>Named Entities</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {intents.map(item => <IntentListItemRow key={item.intentId} {...item} />)}
                    </tbody>
                </Table>
            </Container>
        </MainContentDecorator>
    )
}

function IntentListItemRow({intentId, label, lastUpdated, dataset, ners}:IntentListItem) {
    return (
        <tr className="align-middle">
            <td>{intentId}</td>
            <td>{label}</td>
            <td>{formateDate(lastUpdated)}</td>
            <td>{dataset}</td>
            <td className="col-3">
                <div className="d-flex gap-2 flex-wrap">
                    {ners && ners.map((item, idx) => <Badge key={idx}>{item}</Badge>)}
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