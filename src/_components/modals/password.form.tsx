import { Alert, Button, FormCheck, Modal } from "react-bootstrap";
import type { ModalState } from "../../_hooks/use-modals";
import { FormsInput } from "../ui/forms.input";
import { useForms } from "../../_hooks/use-forms";
import type { PasswordForm } from "../../_models/schemas";
import { isEmpty } from "../../_utils/strings";
import { useEffect, useState } from "react";
import * as accountService from "../../services/account.service"

export default function PasswordFormModal({state:{isOpen, closeModal}, onSaved}: {state:ModalState, onSaved?:() => void}) {

    const [passwordAlert, setPasswordAlert] = useState<string>()
    const [passwordInput, setPasswordInput] = useState<"password" | "text">("password")

    const {controls, onChange, errors, ...form} = useForms<PasswordForm>({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    }, (data, errors) => {
        console.log("Validating")
        if(isEmpty(data.oldPassword)) {
            errors.oldPassword = "Please enter old password."
        }
        if(isEmpty(data.newPassword)) {
            errors.newPassword = "Please enter old password."
        }
        if(isEmpty(data.confirmPassword)) {
            errors.confirmPassword = "Please enter old password."
        }
        if(data.newPassword.length < 6 || data.confirmPassword.length < 6) {
            errors.confirmPassword = "Password must be at least 6 character."
        }
    })

    useEffect(() => {
        if(!passwordAlert) return
        setTimeout(() => setPasswordAlert(undefined), 5000)
    }, [passwordAlert])

    const save = async () => {
        if(!form.validate()) return
        try {
            await accountService.changePassword(form.form)
            form.reset()
            setPasswordAlert("Password updated successfully.")
            onSaved?.()
        } catch (e) {
            if(e instanceof Error) {
                console.log(e.message)
                setPasswordAlert(e.message)
            }
        }
    }

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header>Change Password</Modal.Header>
            <Modal.Body>
                {passwordAlert && <Alert variant="info">{passwordAlert}</Alert>}
                <form onSubmit={form.onSubmit(save)}>
                    <FormsInput type={passwordInput} name={controls.oldPassword} value={form.form.oldPassword} error={errors.oldPassword} onChange={onChange} className="mb-3" label="Old password" placeholder="Enter old password" />
                    <hr />
                    <FormsInput type={passwordInput} name={controls.newPassword} value={form.form.newPassword} error={errors.newPassword} onChange={onChange} className="mb-3" label="New password" placeholder="Enter new password" />
                    <FormsInput type={passwordInput} name={controls.confirmPassword} value={form.form.confirmPassword} error={errors.confirmPassword} onChange={onChange} className="mb-3" label="Confirm password" placeholder="Confirm new password" />
                    <div className="d-flex gap-2 px-2 mb-3">
                        <FormCheck onChange={e => e.target.checked ? setPasswordInput("text") : setPasswordInput("password")} id="showPassword" /> <label htmlFor="showPassword">Show password</label>
                    </div>
                    <div className="d-flex justify-between gap-3">
                        <Button onClick={() => {
                            form.reset()
                            closeModal()
                        }} variant="outline-secondary" className="w-50">Cancel</Button>
                        <Button type="submit" variant="primary" className="w-50">Save</Button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )

}