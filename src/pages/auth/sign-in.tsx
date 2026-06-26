import { Button } from "react-bootstrap";
import { FormsInput } from "../../_components/ui/forms.input";

export default function SignInPage() {
    return (
        <div className="w-50">
            <h4 className="text-center">Login</h4>
            <form className="border p-4">
                <FormsInput label="Email" type="email" name="email" placeholder="Enter Email" className="mb-3"/>
                <FormsInput label="Password" type="password" name="password" placeholder="Enter Password" className="mb-3" />
                <Button className="w-100">Log In</Button>
            </form>
        </div>
    )
}