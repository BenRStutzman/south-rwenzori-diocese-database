import { PagedResults } from "../shared";

export interface Installment {
    id?: number;
    loanId?: number;
    loan?: string;
    memberId?: number;
    member?: string;
    installmentNumber?: number;
    dateDue?: Date;
    principal?: number;
    interest?: number;
    totalDue?: number;
    principalPaid?: number;
    interestPaid?: number;
    totalPaid?: number;
    balance?: number;
    percentagePaid?: number;
    isPaid?: number;
}

export interface FineWindow {
    startDate: Date;
    finePercentage: number;
    fine: number;
}

export interface InstallmentDetails {
    installment: Installment;
    fineWindows: FineWindow[];
}

export interface InstallmentResults extends PagedResults {
    installments: Installment[];
}