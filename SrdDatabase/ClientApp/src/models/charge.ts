import { PagedParameters, PagedResults } from "./shared";

export interface Charge {
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

export interface ChargeDetails {
    charge: Charge;
}

export interface ChargeParameters extends PagedParameters {
    parishId?: number;
    archdeaconryId?: number;
    congregationId?: number;
    startYear?: number;
    endYear?: number;
}

export interface ChargeResults extends PagedResults {
    charges: Charge[];
}
