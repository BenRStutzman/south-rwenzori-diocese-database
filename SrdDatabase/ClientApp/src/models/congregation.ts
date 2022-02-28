import { PagedParameters, PagedResults } from './shared';
import { EventResults } from './event'
import { PaymentResults } from './payment';
import { QuotaResults } from './quota';
import { CensusResults } from './census';

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
    eventResults: EventResults;
    paymentResults: PaymentResults;
    quotaResults: QuotaResults;
    censusResults: CensusResults;
}

export interface CongregationParameters extends PagedParameters {
    name?: string;
    parishId?: number;
    archdeaconryId?: number;
}

export interface CongregationResults extends PagedResults {
    congregations: Congregation[];
}
