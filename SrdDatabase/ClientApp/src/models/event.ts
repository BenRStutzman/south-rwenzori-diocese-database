import { PagedParameters, PagedResults } from "./shared";

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
    description?: string;
    firstPersonName?: string;
    secondPersonName?: string;
    personNames?: string[];
    date?: Date;
    createdBy?: number;
}

export interface EventToSend extends Omit<Event, "date"> {
    date?: string;
}

export interface EventType {
    id: number;
    name: string;
    associatedWithParish: boolean;
    involvesDescription: boolean;
    involvesFirstPerson: boolean;
    involvesSecondPerson: boolean;
}

export interface EventDetails {
    event: Event;
}

export interface EventParameters extends PagedParameters {
    eventTypeId?: number;
    personName?: string;
    description?: string;
    parishId?: number;
    archdeaconryId?: number;
    congregationId?: number;
    startDate?: Date;
    endDate?: Date;
}

export interface EventParametersToSend extends Omit<EventParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
}

export interface EventResults extends PagedResults {
    events: Event[];
}
