import { Results as ArchdeaconryResults } from "./archdeaconry";
import { Results as CongregationResults } from "./congregation";
import { Results as ParishResults } from "./parish";
import { Results as EventResults } from './event';

export interface Details {
    archdeaconryResults: ArchdeaconryResults;
    parishResults: ParishResults;
    congregationResults: CongregationResults;
    eventResults: EventResults;
}