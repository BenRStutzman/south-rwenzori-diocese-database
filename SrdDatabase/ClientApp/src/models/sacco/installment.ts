import { PagedParameters, PagedResults } from "../shared";

export interface Installment {
    id?: number;
    loanId?: number;
    loan?: string;
    memberId?: number;
    member?: string;
    date?: Date;
    amount?: number;
    receiptNumber?: number;
}

export interface InstallmentToSend extends Omit<Installment, "date"> {
    date?: string;
}

export interface InstallmentDetails {
    installment: Installment;
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