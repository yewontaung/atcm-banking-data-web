import type { AuthProfile, AuthResult, AuthToken } from "../_models/outputs";

export function getAuthToken():AuthToken {
    const access_token = localStorage.getItem(import.meta.env.VITE_TOKEN) ?? ""
    return {accessToken: access_token, accessType: "Bearer"}
}

export function getAuthProfile():AuthProfile {
    const profile = localStorage.getItem(`${import.meta.env.VITE_TOKEN}_profile`) ?? ""
    return JSON.parse(profile) as AuthProfile
}

export function updateAuthProfile(authProfile:AuthProfile) {
    localStorage.setItem(`${import.meta.env.VITE_TOKEN}_profile`, JSON.stringify(authProfile))
}

export function setAuthResult(result:AuthResult) {
    const {accessToken: access_token} = result
    localStorage.setItem(import.meta.env.VITE_TOKEN, access_token)
    localStorage.setItem(`${import.meta.env.VITE_TOKEN}_profile`, JSON.stringify(result.profile))
}

export function removeAuth() {
    localStorage.removeItem(import.meta.env.VITE_TOKEN)
    localStorage.removeItem(`${import.meta.env.VITE_TOKEN}_profile`)
}