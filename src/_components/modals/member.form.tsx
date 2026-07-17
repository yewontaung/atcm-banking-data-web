import { Button, Form, Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";
import FormsSelect from "../ui/forms.select";
import { useForms } from "../../_hooks/use-forms";
import type { MemberForm } from "../../_models/schemas";
import * as memberService from "../../services/member.service"
import type { ActionCallback, MemberListItem, ModificationResult } from "../../_models/outputs";
import { useEffect } from "react";

export default function MemberForm({ state: { isOpen, closeModal, }, onSaved, member }: { member?: MemberListItem, state: ModalState, onSaved?: ActionCallback<ModificationResult<number>> }) {
    const { onChange, controls, errors, setForm, reset, ...form } = useForms<MemberForm>({
        memberEmail: "", role: "Collector", name: ""
    }, (data, errors) => {
        if (!data.memberEmail || data.memberEmail == "") {
            errors.memberEmail = "Please enter member email."
        }
        if (!data.name || data.memberEmail == "") {
            errors.name = "Please enter member name"
        }
    })

    useEffect(() => {
        if (!member) {
            reset()
            return
        }
        setForm({
            name: member.memberName,
            memberEmail: member.memberEmail,
            role: member.role,
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [member])

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        if (!form.validate()) return
        try {
            if (member) {
                const result = await memberService.edit(member.memberId, form.form)
                reset()
                onSaved?.(result)
            } else {
                const result = await memberService.add(form.form)
                reset()
                onSaved?.(result)
            }
        } catch (e) {
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
                    <FormsInput error={errors.memberEmail} onChange={onChange} name={controls.memberEmail} value={form.form.memberEmail} className="mb-3" label="Email" placeholder="Enter member email" />
                    <div className="d-flex column-gap-2 mt-3">
                        <Button type="button" className="w-50" variant="outline-secondary" onClick={closeModal}>Cancel</Button>
                        <Button type="submit" className="w-50">{member ? "Save" : "Add"}</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    )
}