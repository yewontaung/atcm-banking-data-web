import type { DatasetModificationLogListItem, PaginationResult } from "../_models/outputs";
import type { LogSearch } from "../_models/searches";
import { queryParam } from "../_utils/param.utils";
import { protectedRequest } from "../rest-client/api";

export async function search(search:LogSearch) {
    const params = queryParam(search)
    const response = await protectedRequest(`datasetlogs?${params}`)
    return (await response.json()) as PaginationResult<DatasetModificationLogListItem>
}