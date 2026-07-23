export type DatasetType = "Training" | "Validation" | "Testing"
export type MemberRole = "Admin" | "Supervisor" | "Collector"
export type ModificationType = "Approve" | "Edit"
export type ActionCallback<T> = (t: T) => void | Promise<void>

export type MemberListItem = {
    memberId: number
    memberProfile?:string
    memberName: string
    memberEmail: string
    role: MemberRole
    datasets: number
}

export type NerListItem = {
    nerId: number
    label: string
    lastUpdated: string
    intents: number
}

export type IntentListItem = {
    intentId: number,
    label: string,
    description: string,
    lastUpdated: string,
    dataset: number,
    ners: { nerId: number, label: string }[]
}

export type DatasetListItem = {
    datasetId: number
    command: string
    datasetType: DatasetType
    approved: boolean
    memberId: number
    memberName: string
    lastUpdated: string
    deleted: boolean
}

// dataset detail

export type DatasetDetailIntentEntity = {
    datasetintentnerId:number
    nerId:number
    label:string
    startIndex:number
    endIndex:number
}

export type DatasetDetailIntent = {
    datasetintentId:number,
    intentId: number,
    label: string,
    startIndex: number,
    endIndex: number,
    entities: DatasetDetailIntentEntity[]
}

export type DatasetDetail = {
    datasetId: number,
    text: string,
    intents: DatasetDetailIntent[],
}

export type DatasetInfo = {
    datasetId: number
    memberId: number
    memberName: string
    memberRole: MemberRole
    datasetType: DatasetType
    approved: boolean
    lastUpdated: string
    deleted: boolean
}

export type DatasetDetailResult = {
    info: DatasetInfo
    dataset: DatasetDetail
}

export type NextDatasetResult = {
    nextDatasetId:number
}

export type DatasetModificationLogListItem = {
    logId:number
    datasetId:number
    accountId:number
    name:string
    accountEmail:string
    accountRole:MemberRole
    profileUrl:string | undefined
    modificationType:ModificationType
    modifiedAt:string
}

// binding backend

export type ModificationResult<T> = {
    resultData: T
}

export type PaginationResult<T> = {
    items: T[]
    page: number
    size: number
    total: number
}

export type AuthProfile = {
    accountId: string,
    accountName: string,
    accountEmail: string,
    accountRole: "Admin" | "Supervisor" | "Collector",
    profileUrl: string,
}

export type AuthToken = {
    accessToken: string,
    accessType: string,
}

export type AuthResult = {
    profile: AuthProfile,
} & AuthToken

export type ProfileResult = {
    trainingDataset: number,
    validationDataset: number,
    testingDataset: number,
} & AuthProfile

export type ProfileUploadResult = {
    imageUrl:string
}

// dashboard dto

export type DatasetMeta = {
    totalDatasets: number
    totalIntents: number
    totalNers: number

}

export type DatasetAnalysis = {
    trainingDatasets: number
    validationDatasets: number
    testingDatasets: number
}

export type CollectRate = {
    memberId: number
    memberName: string
    memberProfile: string
    collectedData: number

}

export type DashboardAnalysis = {
    datasetMeta: DatasetMeta
    datasetAnalysis: DatasetAnalysis
    todayCollectRate: CollectRate[]
    yesterdayCollectRate: CollectRate[]
}