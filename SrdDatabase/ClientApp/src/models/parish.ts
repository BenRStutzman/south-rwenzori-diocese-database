import { Congregation } from './congregation';
import { Event } from './event';
import { PagedResults } from './shared';

export interface Parish {
    id?: number;
    name?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
}

export interface Details {
    parish: Parish;
    congregations: Congregation[];
    recentEvents: Event[];
}

export interface Parameters {
    name?: string;
    archdeaconryId?: number;
}

export interface Results extends PagedResults {
    parishes: Parish[];
}