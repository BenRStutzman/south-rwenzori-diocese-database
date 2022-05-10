import { PagedParameters, PagedResults } from "../shared";

export interface LoanInstallment {
    id?: number;
    loanId?: number;
    memberId?: number;
    member?: string;
    date?: Date;
    amount?: number;
    receiptNumber?: number;
}

export interface LoanInstallmentToSend extends Omit<LoanInstallment, "date"> {
    date?: string;
}

export interface LoanInstallmentDetails {
    loanInstallment: LoanInstallment;
}

export interface LoanInstallmentParameters extends PagedParameters {
    memberId?: number;
    startDate?: Date;
    endDate?: Date;
    receiptNumber?: number;
}

export interface LoanInstallmentParametersToSend extends Omit<LoanInstallmentParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
};

export interface LoanInstallmentResults extends PagedResults {
    loanInstallments: LoanInstallment[];
}