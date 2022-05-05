import { PagedParameters, PagedResults } from "../shared";

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
    date?: Date;
    principal?: number;
    termMonths?: number;
}

export interface LoanToSend extends Omit<Loan, "date"> {
    date?: string;
}

export interface LoanDetails {
    loan: Loan;
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