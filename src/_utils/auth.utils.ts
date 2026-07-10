import type { AuthResult, AuthToken } from "../_models/outputs";

export function getToken():AuthToken {
    const access_token = localStorage.getItem(import.meta.env.VITE_TOKEN) ?? ""
    return {access_token, access_type: "Bearer"}
}

export function setAuthResult(result:AuthResult) {
    const {access_token} = result
    localStorage.setItem(import.meta.env.VITE_TOKEN, access_token)
    localStorage.setItem(`${import.meta.env.VITE_TOKEN}_profile`, JSON.stringify(result.profile))
}