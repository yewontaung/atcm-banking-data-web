import type { DatasetAnalysis, DatasetDetail, DatasetDetailResult, DatasetListItem, DatasetType, ModificationResult, NextDatasetResult, PaginationResult } from "../_models/outputs";
import type { DatasetForm } from "../_models/schemas";
import type { DatasetSearch } from "../_models/searches";
import { queryParam } from "../_utils/param.utils";
import { protectedRequest } from "../rest-client/api";

export async function save(form: DatasetForm) {
    const response = await protectedRequest("datasets", {
        method: "POST",
        body: JSON.stringify(form)
    })

    return (await response.json()) as ModificationResult<number>
}

export async function search(search?: DatasetSearch) {
    const params = queryParam(search ?? {})

    const response = await protectedRequest(`datasets?${params}`)

    return (await response.json()) as PaginationResult<DatasetListItem>
}

export async function moveToBin(datasetId: number) {
    const response = await protectedRequest(`datasets/${datasetId}`, {
        method: "DELETE"
    })

    return (await response.json()) as ModificationResult<number>
}

export async function getBin(page: number, size: number) {
    const params = queryParam({ page, size })
    const response = await protectedRequest(`datasets/bin?${params}`)

    return (await response.json()) as PaginationResult<DatasetListItem>
}

export async function deleteDataset(datasetId: number) {

    const response = await protectedRequest(`datasets/bin/${datasetId}`, {
        method: "DELETE"
    })

    return (await response.json()) as ModificationResult<number>
}

export async function findById(datasetId: number) {
    
    const response = await protectedRequest(`datasets/${datasetId}`)

    return (await response.json()) as DatasetDetailResult

}

export async function approve(datasetId: number) {
    const response = await protectedRequest(`datasets/approve/${datasetId}`, {
        method: "PUT",
    })

    return (await response.json()) as ModificationResult<number>
}
export async function restore(datasetId: number) {
    const response = await protectedRequest(`datasets/bin/restore/${datasetId}`, {
        method: "PUT",
    })

    return (await response.json()) as ModificationResult<number>
}

export async function saveJsons(formData: DatasetForm[]) {
    const response = await protectedRequest("datasets/jsons", {
        method: "POST",
        body: JSON.stringify(formData)
    })

    return (await response.json()) as ModificationResult<number[]>
}

export async function analysis() {
    const response = await protectedRequest("datasets/analysis")

    return (await response.json()) as DatasetAnalysis
}

export async function download(datasetType: DatasetType) {
    const response = await protectedRequest(`datasets/export?dataset_type=${datasetType}`)

    const blob = await response.blob()
    const  url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = `${datasetType.toLowerCase()}.json`
    
    document.body.appendChild(link)
    link.click()

    link.remove()
    URL.revokeObjectURL(url)
}


export async function edit(datasetId: number, form: DatasetDetail) {
    const response = await protectedRequest(`datasets/${datasetId}`, {
        method: "PUT",
        body: JSON.stringify(form)
    })

    return (await response.json()) as ModificationResult<number>
}
export async function nextDataset(current:number) {
    const response = await protectedRequest(`datasets/next?current=${current}`)

    return (await response.json()) as NextDatasetResult
}


