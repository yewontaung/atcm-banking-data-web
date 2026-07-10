export type MemberListItem = {
    member_id:number
    member_name:string
    member_email:string
    role:"admin" | "supervison" | "collector"
    datasets:number
}

export type IntentListItem = {
    id:number,
    intent:string,
    lastUpdated:Date,
    dataset:number,
    namedEntities:{id:number, label:string}[]
}

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
    result_data:T
}

export type AuthProfile = {
    account_id:string,
    account_name:string,
    account_email:string,
    account_role:"Admin" | "Supervisor" | "Collector",
    profile_url:string,    
}

export type AuthToken = {
    access_token:string,
    access_type:string,
}

export type AuthResult = {
    profile:AuthProfile,
} & AuthToken