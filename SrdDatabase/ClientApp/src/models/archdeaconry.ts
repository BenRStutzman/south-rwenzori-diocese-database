import { Congregation } from "./congregation";
import { Parish } from "./parish";
import { PagedResults } from "./shared";
import { Event } from './event';

export interface Archdeaconry {
    id?: number;
    name?: string;
}

export interface Details {
    archdeaconry: Archdeaconry;
    parishes: Parish[];
    congregations: Congregation[];
    recentEvents: Event[];
}

export interface Parameters {
    name?: string;
}

export interface Results extends PagedResults {
    archdeaconries: Archdeaconry[];
}