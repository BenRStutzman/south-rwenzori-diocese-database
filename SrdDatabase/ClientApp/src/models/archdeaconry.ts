import { CongregationResults } from "./congregation";
import { ParishResults } from "./parish";
import { PagedResults } from "./shared";
import { EventResults } from './event';
import { PaymentResults } from "./payment";
import { ChargeResults } from "./charge";

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
    paymentResults: PaymentResults;
    chargeResults: ChargeResults;
}

export interface ArchdeaconryParameters {
    name?: string;
}

export interface ArchdeaconryResults extends PagedResults {
    archdeaconries: Archdeaconry[];
}