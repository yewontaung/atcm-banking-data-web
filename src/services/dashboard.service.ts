import type { DashboardAnalysis } from "../_models/outputs";
import { protectedRequest } from "../rest-client/api";

export async function analysis() {
    const response = await protectedRequest("dashboard")

    return (await response.json()) as DashboardAnalysis
}