export interface Event {
    id?: number;
    eventTypeId?: number;
    eventType?: string;
    congregationId?: number;
    congregation?: string;
    parish?: string;
    archdeaconry?: string;
    firstPersonName?: string;
    secondPersonName?: string;
    date: Date;
}

export interface EventType {
    id: number;
    name: string;
    involvesTwoPeople: boolean;
}