import { getAuthToken, removeAuth } from "../_utils/auth.utils"

export async function publicRequest(url: string, init?: RequestInit) {
    const api = import.meta.env.VITE_API_URL

    const response = await fetch(`${api}/${url}`, {
        ...init,
        headers: {
            ...init?.headers,
            "Content-Type": "application/json"
        }
    })

    if (!response.ok) {
        throw Error(`${(await response.json()).detail}`)
    }
    return response
}

export async function protectedRequest(url: string, init?: RequestInit, jsonContent: boolean = true) {
    const { accessType: access_type, accessToken: access_token } = getAuthToken()

    const api = import.meta.env.VITE_API_URL

    const fetchApi = async () => {
        if (!jsonContent) {
            return await fetch(`${api}/${url}`, {
                ...init,
                headers: {
                    ...init?.headers,
                    "Authorization": `${access_type} ${access_token}`
                }
            })
        }
        return await fetch(`${api}/${url}`, {
            ...init,
            headers: {
                ...init?.headers,
                "Content-Type": "application/json",
                "Authorization": `${access_type} ${access_token}`
            }
        })
    }

    const response = await fetchApi()

    if(response.status === 401) {
        removeAuth()
        window.location.replace('/auth/sign-in')
    }

    if (!response.ok) {
        throw Error(`${(await response.json()).detail}`)
    }
    return response

}