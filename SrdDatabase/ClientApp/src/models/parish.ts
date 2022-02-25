import { CensusResults } from './census';
import { ChargeResults } from './charge';
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
    balance?: number;
}

export interface ParishDetails {
    parish: Parish;
    congregationResults: CongregationResults;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    chargeResults: ChargeResults;
    censusResults: CensusResults;
}

export interface ParishParameters extends PagedParameters {
    name?: string;
    archdeaconryId?: number;
}

export interface ParishResults extends PagedResults {
    parishes: Parish[];
}