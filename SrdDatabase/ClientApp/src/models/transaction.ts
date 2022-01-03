import { PagedResults } from "./shared";

export interface Transaction {
    id?: number;
    transactionTypeId?: number;
    transactionType?: string;
    amount?: number;
    congregationId?: number;
    congregation?: string;
    parishId?: number;
    parish?: string;
    archdeaconryId?: number;
    archdeaconry?: string;
    date?: Date;
    createdBy?: number;
}

export interface TransactionType {
    id: number;
    name: string;
}

export interface TransactionDetails {
    transaction: Transaction;
}

export interface TransactionParameters {
    transactionTypeId?: number;
    parishId?: number;
    archdeaconryId?: number;
    congregationId?: number;
    startDate?: Date;
    endDate?: Date;
}

export interface TransactionResults extends PagedResults {
    transactions: Transaction[];
}
