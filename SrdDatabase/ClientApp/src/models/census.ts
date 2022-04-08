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
    males0To12?: number;
    females0To12?: number;
    males13To17?: number;
    females13To17?: number;
    males18To35?: number;
    females18To35?: number;
    males36AndAbove?: number;
    females36AndAbove?: number;
    date?: Date;
    createdBy?: number;
};

export interface CensusToSend extends Omit<Census, "date"> {
    date?: string;
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

export interface CensusParametersToSend extends Omit<Census, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
}

export interface CensusResults extends PagedResults {
    censuses: Census[];
}
