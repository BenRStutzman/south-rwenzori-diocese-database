﻿import { PaymentResults } from "./payment";
import { PagedParameters, PagedResults } from "../shared";
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
    dateOfExpiry?: Date;
    termMonths?: number; 
    principal?: number;
    principalPerInstallment?: number;
    principalDue?: number;
    interestPerInstallment?: number;
    monthsOfInterest?: number;
    interest?: number;
    fines?: number;
    totalDue?: number;
    principalPaid?: number;
    interestPaid?: number;
    finesPaid?: number;
    totalPaid?: number;
    balance?: number;
    percentagePaid?: number;
    isPaid?: number;
}

export interface LoanToSend extends Omit<Loan, "dateDisbursed"> {
    dateDisbursed?: string;
}

export interface LoanDetails {
    loan: Loan;
    installmentResults: InstallmentResults;
    paymentResults: PaymentResults;
}

export interface LoanParameters extends PagedParameters {
    memberId?: number;
    loanTypeId?: number;
    startDate?: Date;
    endDate?: Date;
    isPaid?: boolean
}

export interface LoanParametersToSend extends Omit<LoanParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
};

export interface LoanResults extends PagedResults {
    loans: Loan[];
}