import { CongregationResults } from "./congregation";
import { ParishResults } from "./parish";
import { PagedParameters, PagedResults, Population } from "./shared";
import { EventResults } from './event';
import { PaymentResults } from "./payment";
import { QuotaResults } from "./quota";

export interface Archdeaconry {
    id?: number;
    name?: string;
    numberOfChristians?: number;
    quota?: number;
    balance?: number;
}

export interface ArchdeaconryDetails {
    archdeaconry: Archdeaconry;
    population: Population;
    parishResults: ParishResults;
    congregationResults: CongregationResults;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    quotaResults: QuotaResults;
}

export interface ArchdeaconryParameters extends PagedParameters {
    name?: string;
}

export interface ArchdeaconryResults extends PagedResults {
    archdeaconries: Archdeaconry[];
}