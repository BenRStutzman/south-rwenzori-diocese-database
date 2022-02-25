import { ArchdeaconryResults } from "./archdeaconry";
import { CongregationResults } from "./congregation";
import { ParishResults } from "./parish";
import { EventResults } from './event';
import { ChargeResults } from "./charge";
import { PaymentResults } from "./payment";
import { CensusResults } from "./census";

export interface DioceseDetails {
    archdeaconryResults: ArchdeaconryResults;
    parishResults: ParishResults;
    congregationResults: CongregationResults;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    chargeResults: ChargeResults;
    censusResults: CensusResults;
    numberOfChristians?: number;
    quota: number;
    balance: number;
}