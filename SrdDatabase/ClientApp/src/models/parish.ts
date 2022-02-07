import { ChargeResults } from './charge';
import { CongregationResults } from './congregation';
import { EventResults } from './event';
import { PaymentResults } from './payment';
import { PagedResults } from './shared';

export interface Parish {
    id?: number;
    name?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
    balance?: number;
}

export interface ParishDetails {
    parish: Parish;
    congregationResults: CongregationResults;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    chargeResults: ChargeResults;
}

export interface ParishParameters {
    name?: string;
    archdeaconryId?: number;
}

export interface ParishResults extends PagedResults {
    parishes: Parish[];
}