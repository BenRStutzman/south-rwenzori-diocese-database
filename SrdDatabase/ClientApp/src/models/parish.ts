import { CongregationResults } from './congregation';
import { EventResults } from './event';
import { PagedResults } from './shared';

export interface Parish {
    id?: number;
    name?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
}

export interface ParishDetails {
    parish: Parish;
    congregationResults: CongregationResults;
    eventResults: EventResults;
}

export interface ParishParameters {
    name?: string;
    archdeaconryId?: number;
}

export interface ParishResults extends PagedResults {
    parishes: Parish[];
}