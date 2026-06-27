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