export const iconSize = 15

export const defaultProfile = "/imgs/profile.avif"

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

// export const prompt = `Generate "10" datasets (in burese language) and for these intents and their related ners \n(set intent's start and end indexes for burmese sentence correctly, take the whole meaningful sentence for intent, also set ner's indexes correctly for burmese language) \n[\n\tINTENT_ARRAYS\n]\n in this format.
// `

export const prompt = `
Generate "2" datasets in Burmese language for the following intent and related NERs.

IMPORTANT ANNOTATION RULES:
1. Calculate all startIndex and endIndex values using JavaScript string indexing (UTF-16 code unit offsets), the same as:
   - String.length
   - selectionStart / selectionEnd
   - substring()
   - slice()

2. Do NOT calculate indexes by manually counting visible Burmese characters.
3. The index range must satisfy:
   command.slice(startIndex, endIndex) === selected text

4. For intent:
   - startIndex must start from the first character of the meaningful user request.
   - endIndex must cover the entire meaningful sentence/command.
   - Do not include unnecessary whitespace before or after the sentence.

5. For NER:
   - Select only the actual entity value.
   - Do not include Burmese grammatical particles or postpositions.
   Examples:
     "မောင်အောင်ကို" -> receiver is "မောင်အောင်", exclude "ကို"
     "မသီတာထံကို" -> receiver is "မသီတာ", exclude "ထံကို"
   - amount should contain only the numeric value unless the entity definition explicitly requires the currency unit.

6. After generating each dataset, internally verify every index by applying:
   command.slice(startIndex, endIndex)
   and ensure it exactly matches the intended text.

Intent definitions:
[

]

Return ONLY JSON in this format:
`