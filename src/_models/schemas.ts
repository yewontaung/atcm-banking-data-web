import type { MemberRole } from "./outputs"

// dataset schema
export type DatasetIntentNerItem = {
    nerId:number,
    label:string,
    startIndex:number,
    endIndex:number,
}

export type DatasetIntentItem = {
    intentId:number,
    label:string,
    startIndex:number,
    endIndex:number,
    ners:DatasetIntentNerItem[]
}

export type DatasetForm = {
    command:string,
    datasetType:"Training" | "Validation" | "Testing"
    intents:DatasetIntentItem[]
}


// sign in schema
export type SignInForm = {
    accountEmail:string,
    password:string,
}

// member schema
export type MemberForm = {
    name:string,
    role:MemberRole
    memberEmail:string
}

// ner schema
export type NerForm = {
    label:string
}

// intent schema
export type IntentForm = {
    label:string,
    description:string,
    ners:number[]
}

export type IntentEditForm = {
    intentId:number,
    label:string,
    description:string,
}

// password schema
export type PasswordForm = {
    oldPassword:string,
    newPassword:string,
    confirmPassword:string,
}