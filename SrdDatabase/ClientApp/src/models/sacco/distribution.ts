import { PagedParameters, PagedResults } from "../shared";

export interface DistributionType {
    id?: number;
    name: string;
}

export interface Distribution {
    id?: number;
    date?: Date;
    dividendPercentage?: number;
    interestPercentage?: number;
    totalDividend?: number;
    totalInterest?: number;
    totalDistributed?: number;
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
    dividendPercentage?: number;
    interestPercentage?: number;
    dividend?: number;
    interest?: number;
}

export interface DistributionAppliedResults extends PagedResults {
    distributionsApplied: DistributionApplied[];
}