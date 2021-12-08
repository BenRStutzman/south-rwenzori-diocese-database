import { PagedResults } from './shared';
import { EventResults } from './event'

export interface Congregation {
    id?: number;
    name?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
}

export interface CongregationDetails {
    congregation: Congregation;
    eventResults: EventResults;
}

export interface CongregationParameters {
    name?: string;
    parishId?: number;
    archdeaconryId?: number;
}

export interface CongregationResults extends PagedResults {
    congregations: Congregation[];
}
