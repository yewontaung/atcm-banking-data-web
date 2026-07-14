import type { IntentListItem, ModificationResult } from "../_models/outputs";
import type { IntentForm } from "../_models/schemas";
import type { IntentSearch } from "../_models/searches";
import { queryParam } from "../_utils/param.utils";
import { protectedRequest } from "../rest-client/api";

export async function search(search?:IntentSearch) {
    const params = queryParam(search ?? {})
    const resposne = await protectedRequest(`intents?${params}`, {
        method: "GET",
    })

    return (await resposne.json()) as IntentListItem[]
}

export async function save(form: IntentForm) {
    const response = await protectedRequest("intents", {
        method: "POST",
        body: JSON.stringify(form)
    })

    return (await response.json()) as ModificationResult<number>
}

export async function remove(intentId: number) {
    const response = await protectedRequest(`intents/${intentId}`, {
        method: "DELETE"
    })

    return (await response.json()) as ModificationResult<number>
}
