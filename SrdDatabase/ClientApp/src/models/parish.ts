import { CensusResults } from './census';
import { QuotaResults } from './quota';
import { CongregationResults } from './congregation';
import { EventResults } from './event';
import { PaymentResults } from './payment';
import { PagedParameters, PagedResults } from './shared';

export interface Parish {
    id?: number;
    name?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
    numberOfChristians?: number;
    quota?: number;
    balance?: number;
}

export interface ParishDetails {
    parish: Parish;
    congregationResults: CongregationResults;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    quotaResults: QuotaResults;
    censusResults: CensusResults;
}

export interface ParishParameters extends PagedParameters {
    name?: string;
    archdeaconryId?: number;
}

export interface ParishResults extends PagedResults {
    parishes: Parish[];
}