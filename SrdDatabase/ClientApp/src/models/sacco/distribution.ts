import { PagedParameters, PagedResults } from "../shared";

export interface DistributionType {
    id?: number;
    name: string;
}

export interface Distribution {
    id?: number;
    date?: Date;
    percentage?: number;
}

export interface DistributionToSend extends Omit<Distribution, "date"> {
    date?: string;
}

export interface DistributionDetails {
    distribution: Distribution;
}

export interface DistributionParameters extends PagedParameters {
    startDate?: Date;
    endDate?: Date;
}

export interface DistributionParametersToSend extends Omit<DistributionParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
};

export interface DistributionResults extends PagedResults {
    distributions: Distribution[];
}

export interface DistributionApplied {
    distributionId?: number;
    date?: Date;
    percentage?: number;
    amount?: number;
}

export interface DistributionAppliedResults extends PagedResults {
    distributionsApplied: DistributionApplied[];
}