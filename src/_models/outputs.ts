export type DatasetType = "Training" | "Validation" | "Testing"
export type MemberRole = "Admin" | "Supervisor" | "Collector"
export type ActionCallback<T> = (t: T) => void

export type MemberListItem = {
    memberId: number
    memberName: string
    memberEmail: string
    role: "admin" | "supervison" | "collector"
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

export type DatasetDetailIntent = {
    intentId: number,
    label: string,
    startIndex: number,
    endIndex: number,
}

export type DatasetIntentNerAlignment = {
    nerId: number,
    label: string,
    startIndex: number,
    endIndex: number,
    intentId: number,
}

export type DatasetDetail = {
    datasetId: number,
    command: string,
    intents: DatasetDetailIntent[],
    alignments: DatasetIntentNerAlignment[],
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