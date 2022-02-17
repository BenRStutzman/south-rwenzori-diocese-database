import { PagedParameters, PagedResults } from './shared';
import { EventResults } from './event'
import { PaymentResults } from './payment';
import { ChargeResults } from './charge';

export interface Congregation {
    id?: number;
    name?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
    balance?: number;
}

export interface CongregationDetails {
    congregation: Congregation;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    chargeResults: ChargeResults;
}

export interface CongregationParameters extends PagedParameters {
    name?: string;
    parishId?: number;
    archdeaconryId?: number;
}

export interface CongregationResults extends PagedResults {
    congregations: Congregation[];
}
