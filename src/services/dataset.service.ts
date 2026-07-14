import type { ModificationResult } from "../_models/outputs";
import type { DatasetForm } from "../_models/schemas";
import { protectedRequest } from "../rest-client/api";

export async function save(form:DatasetForm) {
    const response = await protectedRequest("datasets", {
        method: "POST",
        body: JSON.stringify(form)
    })

    return (await response.json()) as ModificationResult<number> 
}