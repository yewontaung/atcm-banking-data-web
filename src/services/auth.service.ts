import type { AuthResult } from "../_models/outputs";
import type { SignInForm } from "../_models/schemas";
import { setAuthResult } from "../_utils/auth.utils";
import { publicRequest } from "../rest-client/api";

export async function signIn(form:SignInForm) {
    const response = await publicRequest("auth/sign-in", {
        method: "POST",
        body: JSON.stringify(form)
    })
    const result = (await response.json()) as AuthResult
    setAuthResult(result)
}