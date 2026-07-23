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

export type DatasetSearch = {
    status:"pending" | "approved" | ""
    strategy:"intent" | "collector" | "command" | ""
    datasetType:"Training" | "Validation" | "Testing" | ""
    keyword:string
    page:number
    size:number
}

export type LogSearch = {
    page:number,
    size:number,
}