import { PagedParameters, PagedResults } from "./shared";

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
    receiptNumber?: number;
    createdBy?: number;
}

export interface PaymentToSend extends Omit<Payment, "date"> {
    date?: string;
}

export interface PaymentDetails {
    payment: Payment;
}

export interface PaymentParameters extends PagedParameters {
    parishId?: number;
    archdeaconryId?: number;
    congregationId?: number;
    startDate?: Date;
    endDate?: Date;
    receiptNumber?: number;
};

export interface PaymentParametersToSend extends Omit<PaymentParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
};

export interface PaymentResults extends PagedResults {
    payments: Payment[];
}
