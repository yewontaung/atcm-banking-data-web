import { Alert, Button, ButtonGroup, Container, Row, Table } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { FormsInput } from "../../_components/ui/forms.input";
import { Edit2Icon, TrashIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import NERForm from "../../_components/modals/ner.form";
import { useModals } from "../../_hooks/use-modals";
import { useEffect, useState } from "react";
import * as nersService from "../../services/ners.service"
import { useSearchParams } from "react-router-dom";
import { useForms } from "../../_hooks/use-forms";
import type { NerSearch } from "../../_models/searches";
import type { NerListItem } from "../../_models/outputs";

export default function NersListPage() {
    const state = useModals()
    const [loading, setLoading] = useState(true)
    const [params, setParams] = useSearchParams()
    const [ners, setNers] = useState<NerListItem[]>([])

    const {controls, ...form} = useForms<NerSearch>({q: ""})

    useEffect(() => {
        const loadNer = async () => {
            try {
                const items = await nersService.search({q: params.get("q") ?? ""})
                setNers(items)
            } finally {
                setLoading(false)
            }
        }
        loadNer()
    }, [params])

    const onSearch = async (e?:React.SubmitEvent) => {
        e?.preventDefault()
        setParams(form.form)
        const items = await nersService.search(form.form)
        setNers(items)
    }

    const onSaved = () => {
        state.closeModal()
        onSearch()
    }

    return (
        <MainContentDecorator title="Named Entities Management">
            <Container className="mt-3">
                {/* Search NER Form */}
                <form onSubmit={onSearch} className="row gap-2">
                    <FormsInput onChange={form.onChange} name={controls.q} value={form.form.q} className="col-auto px-0" label="Keyword" placeholder="Enter keyword" />
                    <Button type="submit" className="align-self-end col-auto">Search</Button>
                    <Button type="button" onClick={state.openModal} variant="danger" className="align-self-end col-auto">Add Named Entity</Button>
                </form>
            </Container>
            <NERForm onSaved={onSaved} state={state} />

            <Container className="mt-3">
                {/* NER List Table */}
                <Row>
                    {!loading && ners.length == 0 && <Alert className="text-center w-100" variant="light">Add named enities.</Alert>}
                    {!loading && (
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
                                {ners.map(i => (
                                    <tr key={i.nerId} className="align-middle">
                                        <td>{i.nerId}</td>
                                        <td>{i.label}</td>
                                        <td>{i.lastUpdated}</td>
                                        <td>{i.intents}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-primary"><Edit2Icon size={iconSize} /></Button>
                                                <Button size="sm" variant="outline-danger"><TrashIcon size={iconSize} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Row>
            </Container>
        </MainContentDecorator>
    )
}