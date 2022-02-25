import { PagedParameters, PagedResults } from "./shared";

export interface Census {
    id?: number;
    congregationId?: number;
    congregation?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
    numberOfChristians?: number;
    date?: Date;
    createdBy?: number;
}

export interface CensusDetails {
    census: Census;
}

export interface CensusParameters extends PagedParameters {
    parishId?: number;
    archdeaconryId?: number;
    congregationId?: number;
    startDate?: Date;
    endDate?: Date;
}

export interface CensusResults extends PagedResults {
    censuses: Census[];
}
