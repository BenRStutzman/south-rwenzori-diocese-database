import { CongregationResults } from "./congregation";
import { ParishResults } from "./parish";
import { PagedResults } from "./shared";
import { EventResults } from './event';

export interface Archdeaconry {
    id?: number;
    name?: string;
    balance?: number;
}

export interface ArchdeaconryDetails {
    archdeaconry: Archdeaconry;
    parishResults: ParishResults;
    congregationResults: CongregationResults;
    eventResults: EventResults;
}

export interface ArchdeaconryParameters {
    name?: string;
}

export interface ArchdeaconryResults extends PagedResults {
    archdeaconries: Archdeaconry[];
}