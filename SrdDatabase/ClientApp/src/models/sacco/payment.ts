import { PagedParameters, PagedResults } from "../shared";

export interface Payment {
    id?: number;
    loanId?: number;
    loan?: string;
    memberId?: number;
    member?: string;
    date?: Date;
    amount?: number;
    receiptNumber?: number;
    principal?: number;
    interest?: number;
    finePaid?: number;
    fineIncurred?: number;
    createdBy?: string;
    updatedBy?: string;
}

export interface PaymentToSend extends Omit<Payment, "date"> {
    date?: string;
}

export interface PaymentDetails {
    payment: Payment;
}

export interface PaymentParameters extends PagedParameters {
    loanId?: number;
    memberId?: number;
    startDate?: Date;
    endDate?: Date;
    receiptNumber?: number;
}

export interface PaymentParametersToSend extends Omit<PaymentParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
};

export interface PaymentResults extends PagedResults {
    payments: Payment[];
}