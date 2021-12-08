﻿import { PagedResults } from "./shared";

export interface Event {
    id?: number;
    eventTypeId?: number;
    eventType?: string;
    congregationId?: number;
    congregation?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
    firstPersonName?: string;
    secondPersonName?: string;
    date?: Date;
}

export interface EventType {
    id: number;
    name: string;
    involvesTwoPeople: boolean;
}

export interface Details {
    event: Event;
}

export interface Parameters {
    eventTypeId?: number;
    personName?: string;
    parishId?: number;
    archdeaconryId?: number;
    congregationId?: number;
    startDate?: Date;
    endDate?: Date;
}

export interface Results extends PagedResults {
    events: Event[];
}
