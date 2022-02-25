﻿import { CongregationResults } from "./congregation";
import { ParishResults } from "./parish";
import { PagedParameters, PagedResults } from "./shared";
import { EventResults } from './event';
import { PaymentResults } from "./payment";
import { ChargeResults } from "./charge";
import { CensusResults } from "./census";

export interface Archdeaconry {
    id?: number;
    name?: string;
    numberOfChristians?: number;
    quota?: number;
    balance?: number;
}

export interface ArchdeaconryDetails {
    archdeaconry: Archdeaconry;
    parishResults: ParishResults;
    congregationResults: CongregationResults;
    eventResults: EventResults;
    paymentResults: PaymentResults;
    chargeResults: ChargeResults;
    censusResults: CensusResults;
}

export interface ArchdeaconryParameters extends PagedParameters {
    name?: string;
}

export interface ArchdeaconryResults extends PagedResults {
    archdeaconries: Archdeaconry[];
}