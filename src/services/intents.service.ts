import type { IntentData } from "../_models/outputs";

export function getIntents():IntentData[] {
    const intents:IntentData[] = [
        {
            id: "1",
            label: "CHECK_BALANCE",
            namedEntities: [],
        },
        {
            id: "2",
            label: "TRANSFER_FUND",
            namedEntities: [
                {id: "1", label: "RECIPIENT"},
                {id: "2", label: "AMOUNT"},
            ]
        }
    ]
    return intents 
}