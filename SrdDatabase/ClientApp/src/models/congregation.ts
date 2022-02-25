import { PagedParameters, PagedResults } from './shared';
import { EventResults } from './event'
import { PaymentResults } from './payment';
import { ChargeResults } from './charge';
import { CensusResults } from './census';

export interface Congregation {
    id?: number;
    name?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
    numberOfChristians?: number;
    balance?: number;
}

export interface CongregationDetails {
    congregation: Congregation;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    chargeResults: ChargeResults;
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
