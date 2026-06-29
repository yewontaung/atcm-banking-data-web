export type DatasetFormNER = {
    id:string,
    label:string,
    start:number,
    end:number,
    intentId:string,
}

export type DatasetFormIntent = {
    id:string,
    label:string,
    start:number,
    end:number,
    namedEntities:DatasetFormNER[]
}

export type DatasetForm = {
    command:string,
    intents:DatasetFormIntent[]
}