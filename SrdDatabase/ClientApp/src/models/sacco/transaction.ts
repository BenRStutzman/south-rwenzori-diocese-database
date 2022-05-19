import { PagedParameters, PagedResults } from "../shared";

export interface Transaction {
    id?: number;
    memberId?: number;
    member?: string;
    accountNumber?: number;
    date?: Date;
    isShares?: boolean;
    isContribution?: boolean;
    amount?: number;
    receiptNumber?: number;
}

export interface TransactionToSend extends Omit<Transaction, "date"> {
    date?: string;
}

export interface TransactionDetails {
    transaction: Transaction;
}

export interface TransactionParameters extends PagedParameters {
    memberId?: number;
    startDate?: Date;
    endDate?: Date;
    receiptNumber?: number;
    isShares?: boolean;
    isContribution?: boolean;
}

export interface TransactionParametersToSend extends Omit<TransactionParameters, "startDate" | "endDate"> {
    startDate?: string;
    endDate?: string;
};

export interface TransactionResults extends PagedResults {
    transactions: Transaction[];
}