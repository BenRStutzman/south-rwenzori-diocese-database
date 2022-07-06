import { QuotaResults } from './quota';
import { CongregationResults } from './congregation';
import { EventResults } from './event';
import { PaymentResults } from './payment';
import { PagedParameters, PagedResults, Population } from './shared';

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
    population: Population;
    congregationResults: CongregationResults;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    quotaResults: QuotaResults;
}

export interface ParishParameters extends PagedParameters {
    name?: string;
    archdeaconryId?: number;
}

export interface ParishResults extends PagedResults {
    parishes: Parish[];
}