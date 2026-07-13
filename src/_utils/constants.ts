import type { DatasetDetail, IntentListItem } from "../_models/outputs"

export const iconSize = 15

export const defaultProfile = "/imgs/profile.jpg"

export const intentItemSeed:IntentListItem[] = [
    {
        intentId: 1,
        dataset: 200,
        label: "transfer_balance",
        lastUpdated: new Date("01-07-2026"),
        ners: [
            {nerId: 1, label: "T0_ACCOUNT_ID"},
            {nerId: 2, label: "AMOUNT"},
        ]
    },
    {
        intentId: 2,
        dataset: 100,
        label: "check_balance",
        lastUpdated: new Date("02-07-2026"),
        ners: []
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