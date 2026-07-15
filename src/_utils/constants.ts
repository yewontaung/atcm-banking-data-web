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
    datasetId: 1,
    command: "Transfer 4000 to my mom account.",
    intents: [
        {
            intentId: 1,
            label: "transfer_fund",
            startIndex: 0,
            endIndex: 10,
        },
    ],
    alignments: [
        {
            nerId: 1,
            label: "TO_ACCOUNT",
            startIndex: 20,
            endIndex: 30,
            intentId: 1,
        },
        {
            nerId: 2,
            label: "MONEY_AMOUNT",
            startIndex: 10,
            endIndex: 14,
            intentId: 1,
        }
    ]
}