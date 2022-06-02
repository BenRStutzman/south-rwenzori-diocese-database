import { PagedParameters, PagedResults } from "../shared";

export interface Installment {
    id?: number;
    loanId?: number;
    loan?: string;
    memberId?: number;
    member?: string;
    installmentNumber?: number;
    dateDue?: Date;
    isPaid?: boolean;
    datePaid?: Date;
    daysLate?: number;
    receiptNumber?: number;
    principal?: number;
    interest?: number;
    baseDue?: number;
    fineDue?: number;
    totalDue?: number;
}

export interface FineWindow {
    startDate: Date;
    finePercentage: number;
    fineDue: number;
    totalDue: number;
}

export interface InstallmentToSend extends Omit<Installment, "datePaid"> {
    datePaid?: string;
}

export interface InstallmentDetails {
    installment: Installment;
    fineWindows: FineWindow[];
}

export interface InstallmentParameters extends PagedParameters {
    loanId?: number;
    memberId?: number;
    startDate?: Date;
    endDate?: Date;
    receiptNumber?: number;
}

export interface InstallmentParametersToSend extends Omit<InstallmentParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
};

export interface InstallmentResults extends PagedResults {
    installments: Installment[];
}