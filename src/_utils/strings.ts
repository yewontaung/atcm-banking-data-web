export function hasLength(value?:string) {
    return value && value !== ""
}

export function isEmpty(value?:string) {
    return !value || value === ""
}
