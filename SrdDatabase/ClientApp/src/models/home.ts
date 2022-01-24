import { ArchdeaconryResults } from "./archdeaconry";
import { CongregationResults } from "./congregation";
import { ParishResults } from "./parish";
import { EventResults } from './event';
import { TransactionResults } from "./payment";

export interface DioceseDetails {
    archdeaconryResults: ArchdeaconryResults;
    parishResults: ParishResults;
    congregationResults: CongregationResults;
    eventResults: EventResults;
}