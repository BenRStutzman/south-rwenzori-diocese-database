import { Event } from './event';
import { PagedResults } from './shared';

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
    recentEvents: Event[];
}

export interface Parameters {
    name?: string;
    parishId?: number;
    archdeaconryId?: number;
}

export interface Results extends PagedResults {
    congregations: Congregation[];
}
