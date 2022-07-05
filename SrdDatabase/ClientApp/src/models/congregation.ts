import { PagedParameters, PagedResults, Population } from './shared';
import { EventResults } from './event'
import { PaymentResults } from './payment';
import { QuotaResults } from './quota';

export interface Congregation {
    id?: number;
    name?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
    numberOfChristians?: number;
    quota?: number;
    balance?: number;
}

export interface CongregationDetails {
    congregation: Congregation;
    population: Population;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    quotaResults: QuotaResults;
}

export interface CongregationParameters extends PagedParameters {
    name?: string;
    parishId?: number;
    archdeaconryId?: number;
}

export interface CongregationResults extends PagedResults {
    congregations: Congregation[];
}
