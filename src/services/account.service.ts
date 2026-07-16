import type { ModificationResult, ProfileResult } from "../_models/outputs";
import type { PasswordForm } from "../_models/schemas";
import { protectedRequest } from "../rest-client/api";

export async function changePassword(form:PasswordForm) {
    const response = await protectedRequest("me/change-password", {
        method: "POST",
        body: JSON.stringify(form)
    })

    if(response.status === 400) {
        throw new Error((await response.json())["detail"])
    }

    return (await response.json()) as ModificationResult<number>
}

export async function profile() {
    const response = await protectedRequest("me/profile")

    return (await response.json()) as ProfileResult
}
