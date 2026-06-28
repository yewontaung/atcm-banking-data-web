export type MemberListItem = {
    id:number,
    name:string,
    email:string,
    dataset:number,
    role:"admin" | "supervison" | "collector"
}

export type IntentListItem = {
    id:number,
    intent:string,
    lastUpdated:Date,
    dataset:number,
    namedEntities:{id:number, label:string}[]
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