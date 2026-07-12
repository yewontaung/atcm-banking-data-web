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


// sign in schema
export type SignInForm = {
    accountEmail:string,
    password:string,
}

// member schema
export type MemberForm = {
    name:string,
    role:"Admin" | "Supervisor" | "Collector"
    memberEmail:string
}