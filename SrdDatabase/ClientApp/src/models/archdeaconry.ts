import { Results as CongregationResults } from "./congregation";
import { Results as ParishResults } from "./parish";
import { PagedResults } from "./shared";
import { Results as EventResults } from './event';

export interface Archdeaconry {
    id?: number;
    name?: string;
}

export interface Details {
    archdeaconry: Archdeaconry;
    parishResults: ParishResults;
    congregationResults: CongregationResults;
    eventResults: EventResults;
}

export interface Parameters {
    name?: string;
}

export interface Results extends PagedResults {
    archdeaconries: Archdeaconry[];
}