import { Accordion, Button, ButtonGroup, Container, Form, Row } from "react-bootstrap";
import MainContentDecorator from "../../_components/decorators/main-content";
import { FormsInput } from "../../_components/ui/forms.input";
import FormsSelect from "../../_components/ui/forms.select";
import { TrashIcon } from "lucide-react";
import { iconSize } from "../../_utils/constants";
import { GroupLabelInfo, LabelInfo } from "../../_components/label-info";

export default function DatasetEditPage() {

    return (
        <MainContentDecorator title="Add Data">
            <Container className="mt-3">
                <Form>
                    <FormsInput as="textarea" label="Command Text" placeholder="Enter command text" />
                    <SelectIntentForm className="mt-3" />
                    <div className="mt-4">
                        <Button className="w-100">Save for review</Button>
                    </div>
                </Form>
            </Container>
        </MainContentDecorator>
    )
}

function SelectIntentForm({className}:{className?:string}) {
    return (
        <div className={` ${className}`}>
            <Container>
                {/* Editing Intents / Intent form */}
                <Row className="gap-1 mb-3">
                    <FormsSelect label="Intent" className="col-4 px-0">
                        {[1, 2, 3, 4].map(i => <option key={i}>transfer_fund_to_other_account</option>)}
                    </FormsSelect>
                    <FormsInput label="Start" className="col-2 px-0" placeholder="0"/>
                    <FormsInput label="End" className="col-2 px-0" placeholder="0"/>
                </Row>
                <small className="text-warning">NER Alignment</small>
                {["TO_ACC", "AMOUNT"].map((item, idx) => (
                    <Row key={idx} className="gap-1">
                        <LabelInfo className="col-4 px-0" info={item} />
                        <FormsInput className="col-2 px-0" placeholder="0"/>
                        <FormsInput className="col-2 px-0" placeholder="0"/>
                    </Row>
                ))}
                <Row className="mt-3 gap-1">
                    <Button className="col-8 mx-1">Add Intent</Button>
                </Row>
            </Container>
            <Container>
                {/* Added Intents */}
                <Accordion className="mt-3">
                    {[1, 2, 3, 4].map(i => (
                        <Accordion.Item key={i} eventKey={`${i}`}>
                            <Accordion.Header>
                                <Container fluid className="position-relative">
                                    <Row className="gap-1">
                                        <GroupLabelInfo label="Intent" className="col-4 px-0" info="transfer_fund"/>
                                        <GroupLabelInfo label="Start" className="col-2 px-0" info="10"/>
                                        <GroupLabelInfo label="End" className="col-2 px-0" info="20"/>
                                        <ButtonGroup className="col-auto align-self-end px-0">
                                            <Button variant="outline-primary">Edit</Button>
                                            <Button variant="outline-danger"><TrashIcon size={iconSize} /></Button>
                                        </ButtonGroup>
                                    </Row>
                                </Container>
                            </Accordion.Header>
                            <Accordion.Body>
                                <Container fluid>
                                    {["TO_ACC", "AMOUNT"].map((item, idx) => (
                                        <Row key={idx} className="gap-1">
                                            <GroupLabelInfo label="NER" className="col-4 px-0" info={item} />
                                            <GroupLabelInfo label="Start" className="col-2 px-0" info="0"/>
                                            <GroupLabelInfo label="End" className="col-2 px-0" info="0"/>
                                        </Row>
                                    ))}
                                </Container>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Container>
        </div>
    )
}