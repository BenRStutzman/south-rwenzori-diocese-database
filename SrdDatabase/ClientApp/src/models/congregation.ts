import { PagedResults } from './shared';
import { Results as EventResults } from './event'

export interface Congregation {
    id?: number;
    name?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
}

export interface Details {
    congregation: Congregation;
    eventResults: EventResults;
}

export interface Parameters {
    name?: string;
    parishId?: number;
    archdeaconryId?: number;
}

export interface Results extends PagedResults {
    congregations: Congregation[];
}
