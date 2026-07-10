import type { AuthResult } from "../_models/outputs";
import type { SignInForm } from "../_models/schemas";
import { setAuthResult } from "../_utils/auth.utils";
import { publicRequest } from "../rest-client/api";

export async function signIn(form:SignInForm) {
    console.log(JSON.stringify(form));
    
    const api = import.meta.env.VITE_API_URL
    const response = await publicRequest(`${api}/auth/sign-in`, {
        method: "POST",
        body: JSON.stringify(form)
    })
    const result = (await response.json()) as AuthResult
    setAuthResult(result)
}