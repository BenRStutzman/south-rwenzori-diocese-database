import { Results as CongregationResults } from './congregation';
import { Results as EventResults } from './event';
import { PagedResults } from './shared';

export interface Parish {
    id?: number;
    name?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
}

export interface Details {
    parish: Parish;
    congregationResults: CongregationResults;
    eventResults: EventResults;
}

export interface Parameters {
    name?: string;
    archdeaconryId?: number;
}

export interface Results extends PagedResults {
    parishes: Parish[];
}