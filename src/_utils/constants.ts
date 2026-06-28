import type { DatasetDetail, IntentListItem } from "../_models/outputs"

export const iconSize = 15

export const defaultProfile = "https://ew.com/thmb/oJyDGPK12YByADJx5jArTVEFz3w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Spider-Man-Brand-New-Day-Tom-Holland-4-032526-c3624a0c347a404b9f40e5d7834486a2.jpg"

export const intentItemSeed:IntentListItem[] = [
    {
        id: 1,
        dataset: 200,
        intent: "transfer_balance",
        lastUpdated: new Date("01-07-2026"),
        namedEntities: [
            {id: 1, label: "T0_ACCOUNT_ID"},
            {id: 2, label: "AMOUNT"},
        ]
    },
    {
        id: 2,
        dataset: 100,
        intent: "check_balance",
        lastUpdated: new Date("02-07-2026"),
        namedEntities: []
    },
]

export const demoDataset:DatasetDetail = {
    id: 1,
    command: "Transfer 4000 to my mom account.",
    intents: [
        {
            id: 1,
            label: "transfer_fund",
            start: 0,
            end: 10,
        },
    ],
    alignments: [
        {
            id: 1,
            label: "TO_ACCOUNT",
            start: 20,
            end: 30,
            intentId: 1,
        },
        {
            id: 2,
            label: "MONEY_AMOUNT",
            start: 10,
            end: 14,
            intentId: 1,
        }
    ]
}