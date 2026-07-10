export function queryParam<T extends Record<string, unknown>>(t:T):string {
    const params = Object.entries(t).filter(([, value]) => value).map(([k, v]) => [k, String(v)])
    return new URLSearchParams(params).toString()
}
