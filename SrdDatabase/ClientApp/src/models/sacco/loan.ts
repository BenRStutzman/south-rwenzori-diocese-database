﻿import { PagedParameters, PagedResults } from "../shared";
import { InstallmentResults } from "./installment";

export interface LoanType {
    id?: number;
    name: string;
}

export interface Loan {
    id?: number;
    memberId?: number;
    member?: string;
    loanTypeId?: number;
    loanType?: string;
    dateDisbursed?: Date;
    termMonths?: number; 
    principal?: number;
    interest?: number;
    baseDue?: number;
    finesDue?: number;
    totalDue?: number;
    amountPaid?: number;
    percentagePaid?: number;
    isPaid?: number;
}

export interface LoanToSend extends Omit<Loan, "dateDisbursed"> {
    dateDisbursed?: string;
}

export interface LoanDetails {
    loan: Loan;
    installmentResults: InstallmentResults;
}

export interface LoanParameters extends PagedParameters {
    memberId?: number;
    loanTypeId?: number;
    startDate?: Date;
    endDate?: Date;
    termMonths?: number;
}

export interface LoanParametersToSend extends Omit<LoanParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
};

export interface LoanResults extends PagedResults {
    loans: Loan[];
}