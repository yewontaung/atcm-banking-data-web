export async function publicRequest(url:string, init?:RequestInit) {
    const response = await fetch(url, {
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