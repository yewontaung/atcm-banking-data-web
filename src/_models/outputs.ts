export type MemberListItem = {
    memberId:number
    memberName:string
    memberEmail:string
    role:"admin" | "supervison" | "collector"
    datasets:number
}

export type NerListItem = {
    nerId:number
    label:string
    lastUpdated:string
    intents:number
}

export type IntentListItem = {
    intentId:number,
    label:string,
    lastUpdated:string,
    dataset:number,
    ners:{nerId:number, label:string}[]
}

export type DatasetListItem = {
    datasetId:number
    command:string
    datasetType:"Training" | "Validation" | "Testing"
    approved:boolean
    memberId:number
    memberName:string
    lastUpdated:string
}

// old

export type IntentData = {
    id:string,
    label:string,
    namedEntities:{id:string, label:string}[]
}

export type DatasetIntentData = {
    id:number,
    label:string,
    start:number,
    end:number,
}

export type NERAlignmentData = {
    id:number,
    label:string,
    start:number,
    end:number,
    intentId:number,
}

export type DatasetDetail = {
    id:number,
    command:string,
    intents: DatasetIntentData[],
    alignments:NERAlignmentData[],
}

// binding backend

export type ModificationResult<T> = {
    resultData:T
}

export type PaginationResult<T> = {
    items:T[]
    page:number
    size:number
    total:number
}

export type AuthProfile = {
    accountId:string,
    accountName:string,
    accountEmail:string,
    accountRole:"Admin" | "Supervisor" | "Collector",
    profileUrl:string,    
}

export type AuthToken = {
    accessToken:string,
    accessType:string,
}

export type AuthResult = {
    profile:AuthProfile,
} & AuthToken