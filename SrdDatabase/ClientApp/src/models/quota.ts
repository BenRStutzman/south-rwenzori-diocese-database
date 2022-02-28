import { PagedParameters, PagedResults } from "./shared";

export interface Quota {
    id?: number;
    amountPerYear?: number;
    congregationId?: number;
    congregation?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
    startYear?: number;
    endYear?: number;
    createdBy?: number;
}

export interface QuotaDetails {
    quota: Quota;
}

export interface QuotaParameters extends PagedParameters {
    parishId?: number;
    archdeaconryId?: number;
    congregationId?: number;
    startYear?: number;
    endYear?: number;
}

export interface QuotaResults extends PagedResults {
    quotas: Quota[];
}
