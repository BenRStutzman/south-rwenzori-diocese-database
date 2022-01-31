﻿import { PagedResults } from "./shared";

export interface Payment {
    id?: number;
    amount?: number;
    congregationId?: number;
    congregation?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
    date?: Date;
    createdBy?: number;
}

export interface PaymentDetails {
    payment: Payment;
}

export interface PaymentParameters {
    parishId?: number;
    archdeaconryId?: number;
    congregationId?: number;
    startDate?: Date;
    endDate?: Date;
}

export interface PaymentResults extends PagedResults {
    payments: Payment[];
}