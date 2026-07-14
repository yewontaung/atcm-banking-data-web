import type { DatasetListItem, ModificationResult, PaginationResult } from "../_models/outputs";
import type { DatasetForm } from "../_models/schemas";
import type { DatasetSearch } from "../_models/searches";
import { queryParam } from "../_utils/param.utils";
import { protectedRequest } from "../rest-client/api";

export async function save(form:DatasetForm) {
    const response = await protectedRequest("datasets", {
        method: "POST",
        body: JSON.stringify(form)
    })

    return (await response.json()) as ModificationResult<number> 
}

export async function search(search?:DatasetSearch) {
    const params = queryParam(search ?? {})
    console.log(params)
    const response = await protectedRequest(`datasets?${params}`)

    return (await response.json()) as PaginationResult<DatasetListItem>
}