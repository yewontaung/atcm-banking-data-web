import type { ModificationResult, ProfileResult, ProfileUploadResult } from "../_models/outputs";
import type { PasswordForm } from "../_models/schemas";
import { defaultProfile } from "../_utils/constants";
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

export function resolveProfileImage(profileImage?:string) {
    return profileImage ? `${profileImage}` : defaultProfile
}

export async function uploadProfile(file: File) {
    const formData = new FormData()
    formData.append("file", file)
    const response = await protectedRequest("me/profile/upload", {
        method: "POST",
        body: formData,
    }, false)

    return (await response.json()) as ProfileUploadResult
}
