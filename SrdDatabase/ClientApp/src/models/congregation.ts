import { PagedResults } from './shared';
import { EventResults } from './event'
import { TransactionResults } from './payment';

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
    transactionResults: TransactionResults;
}

export interface CongregationParameters {
    name?: string;
    parishId?: number;
    archdeaconryId?: number;
}

export interface CongregationResults extends PagedResults {
    congregations: Congregation[];
}
