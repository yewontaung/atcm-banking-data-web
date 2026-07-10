import { Alert, Button } from "react-bootstrap";
import { FormsInput } from "../../_components/ui/forms.input";
import { useForms } from "../../_hooks/use-forms";
import type { SignInForm } from "../../_models/schemas";
import { signIn } from "../../services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignInPage() {
    const navigate = useNavigate()
    const [alert, setAlert] = useState<string>()
    const {controls, onChange, errors, ...form} = useForms<SignInForm>(
        {account_email: "", password: ""},
        (data, errors) => {
            if(!data.account_email || data.account_email === "") {
                errors.account_email = "Please enter email"
            }
            if(!data.password || data.password === "") {
                errors.password = "Please enter password."
            }
        }
    )

    const onSubmit = async (e:React.SubmitEvent) => {
        e.preventDefault()

        if(!form.validate()) return

        try {
            console.log(form.form)
            await signIn(form.form)
            navigate("/dashboard", {replace: true})
        } catch(e) {
            if(e instanceof TypeError) {
                setAlert("Something went wrong.")
                setTimeout(() => setAlert(undefined), 5000)
            }
            if(e instanceof Error) {
                setAlert(e.message)
                setTimeout(() => setAlert(undefined), 5000)
            }
        }
    }

    return (
        <div className="w-50">
            <h4 className="text-center">Login</h4>
            <form onSubmit={onSubmit} className="border p-4">
                {alert && <Alert variant="info">{alert}</Alert>}
                <FormsInput label="Email" error={errors.account_email} name={controls.account_email} onChange={onChange} placeholder="Enter Email" className="mb-3"/>

                <FormsInput label="Password" error={errors.password} type="password" name={controls.password} onChange={onChange} placeholder="Enter Password" className="mb-3" />

                <Button type="submit" className="w-100">Log In</Button>
            </form>
        </div>
    )
}