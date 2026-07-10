import { Button, Form, Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";
import FormsSelect from "../ui/forms.select";
import { useForms } from "../../_hooks/use-forms";
import type { MemberForm } from "../../_models/schemas";
import * as memberService from "../../services/member.service"
import type { ModificationResult } from "../../_models/outputs";

export default function MemberForm({state:{isOpen, closeModal,}, onSaved}:{state:ModalState, onSaved?:(result:ModificationResult<number>) => void}) {
    const {onChange, controls, errors,...form} = useForms<MemberForm>({
        member_email: "", role: "Collector", name: ""
    }, (data, errors) => {
        if(!data.member_email || data.member_email == "") {
            errors.member_email = "Please enter member email."
        }
        if(!data.name || data.member_email == "") {
            errors.name = "Please enter member name"
        }
    })

    const onSubmit = async (e:React.SubmitEvent) => {
        e.preventDefault()
        if(!form.validate()) return
        try {
            const result = await memberService.add(form.form)
            form.reset()
            onSaved?.(result)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title className="h5">Add Member</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <div className="d-flex">
                        <FormsInput error={errors.name} onChange={onChange} name={controls.name} value={form.form.name} className="mb-3 flex-grow-1 me-3" label="Name" placeholder="Enter member name" />
                        <FormsSelect onChange={onChange} name={controls.role} value={form.form.role} label="Role">
                            <option value={"Collector"}>Collector</option>
                            <option value={"Supervisor"}>Supervisor</option>
                            <option value={"Admin"}>Admin</option>
                        </FormsSelect>
                    </div>
                    <FormsInput error={errors.member_email} onChange={onChange} name={controls.member_email} value={form.form.member_email} className="mb-3" label="Email" placeholder="Enter member email" />
                    <div className="d-flex column-gap-2 mt-3">
                        <Button type="button" className="w-50" variant="outline-secondary" onClick={closeModal}>Cancel</Button>
                        <Button type="submit" className="w-50">Add</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}