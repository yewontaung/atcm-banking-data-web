import type { MemberListItem, ModificationResult } from "../_models/outputs";
import type { MemberForm } from "../_models/schemas";
import type { MemberSearch } from "../_models/searches";
import { queryParam } from "../_utils/param.utils";
import { protectedRequest } from "../rest-client/api";


export async function search(search?: MemberSearch) {
    const params = queryParam(search ?? {})

    const response = await protectedRequest(`members?${params}`, {
        method: "GET",
    })

    return (await response.json()) as MemberListItem[]
    
}
export async function add(form: MemberForm) {
    const response = await protectedRequest("members", {
        method: "POST",
        body: JSON.stringify(form)
    })

    return (await response.json()) as ModificationResult<number>

}


export async function edit(memberId: number, form: MemberForm) {
    const response = await protectedRequest(`members/${memberId}`, {
        method: "PUT",
        body: JSON.stringify(form)
    })

    return (await response.json()) as ModificationResult<number>
}
