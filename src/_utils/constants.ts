export const iconSize = 15

export const defaultProfile = "/imgs/profile.jpg"

export const datasetFormformat = [
    {
        command: "string",
        datasetType: "'Training' | 'Validation' | 'Testing'",
        intents: [{
            intentId: "number",
            label: "string",
            startIndex: "number",
            endIndex: "number",
            ners: [
                {
                    nerId: "number",
                    label: "string",
                    startIndex: "number",
                    endIndex: "number",
                }]
        }
        ],
    }
]

export const prompt = `Generate "10" datasets (in burese language) for these intents and their related ners \n[\n\tINTENT_ARRAYS\n]\n in this format.
`