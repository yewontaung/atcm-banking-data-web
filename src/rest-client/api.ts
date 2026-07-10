import { getAuthToken } from "../_utils/auth.utils"

export async function publicRequest(url:string, init?:RequestInit) {
    const api = import.meta.env.VITE_API_URL

    const response = await fetch(`${api}/${url}`, {
        ...init,
        headers: {
            ...init?.headers,
            "Content-Type": "application/json"
        }
    })

    if(!response.ok) {
        throw Error(`${(await response.json()).detail}`)
    }
    return response
}

export async function protectedRequest(url:string, init?:RequestInit) {
    const {access_type, access_token} = getAuthToken()

    const api = import.meta.env.VITE_API_URL

    const response = await fetch(`${api}/${url}`, {
        ...init,
        headers: {
            ...init?.headers,
            "Content-Type": "application/json",
            "Authorization": `${access_type} ${access_token}` 
        }
    })

    if(!response.ok) {
        throw Error(`${(await response.json()).detail}`)
    }
    return response
}