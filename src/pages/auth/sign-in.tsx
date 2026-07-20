import { Alert, Button, Container, Row } from "react-bootstrap";
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
        {accountEmail: "", password: ""},
        (data, errors) => {
            if(!data.accountEmail || data.accountEmail === "") {
                errors.accountEmail = "Please enter email"
            }
            if(!data.password || data.password === "") {
                errors.password = "Please enter password."
            }
        }
    )

    const [logginIn, setLoggingIn] = useState(false)

    const onSubmit = async (e:React.SubmitEvent) => {
        e.preventDefault()

        if(!form.validate()) return

        try {
            setLoggingIn(true)
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
        } finally {
            setLoggingIn(false)
        }
    }

    return (
        <Container fluid>
            <Row className="justify-content-center">
                <div className="col-10 col-md-6">
                    <h4 className="text-center">Login</h4>
                    <form onSubmit={onSubmit} className="border p-4">
                        {alert && <Alert variant="info">{alert}</Alert>}
                        <FormsInput label="Email" error={errors.accountEmail} name={controls.accountEmail} onChange={onChange} placeholder="Enter Email" className="mb-3"/>

                        <FormsInput label="Password" error={errors.password} type="password" name={controls.password} onChange={onChange} placeholder="Enter Password" className="mb-3" />

                        <Button type="submit" className="w-100" disabled={logginIn}>{logginIn ? "Loggin in..." : "Log In"}</Button>
                    </form>
                </div>
            </Row>
        </Container>
    )
}