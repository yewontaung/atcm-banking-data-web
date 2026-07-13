export type MemberSearch = {
    role:"Admin" | "Supervisor" | "Collector" | string,
    keyword:string,
}

export type NerSearch = {
    q:string
}

export type IntentSearch = {
    q:string
}
