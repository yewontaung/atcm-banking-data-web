import type { ModificationResult, NerListItem } from "../_models/outputs"
import type { NerForm } from "../_models/schemas"
import type { NerSearch } from "../_models/searches"
import { queryParam } from "../_utils/param.utils"
import { protectedRequest } from "../rest-client/api"

export async function search(search?: NerSearch) {
    const params = queryParam(search ?? {})

    const response = await protectedRequest(`ners?${params}`, {
        method: "GET",
    })

    return (await response.json()) as NerListItem[]
    
}

export async function save(form: NerForm) {
    const response = await protectedRequest("ners", {
        method: "POST",
        body: JSON.stringify(form)
    })
    return (await response.json()) as ModificationResult<number>
}

