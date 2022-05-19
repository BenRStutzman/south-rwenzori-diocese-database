import { PagedParameters, PagedResults } from "../shared";
import { DividendAppliedResults } from "./dividend";
import { LoanResults } from "./loan";
import { TransactionResults } from "./transaction";

export interface Member {
    id?: number;
    accountNumber?: number;
    name?: string;
    dateJoined?: Date;
    autoFeesStartDate?: Date;
    yearsOfFees?: number;
    shares?: number;
    savings?: number;
    balance?: number;
}

export interface MemberToSend extends Omit<Member, "dateJoined"> {
    dateJoined?: string;
}

export interface MemberDetails {
    member: Member;
    transactionResults: TransactionResults;
    dividendAppliedResults: DividendAppliedResults;
    loanResults: LoanResults;
}   

export interface MemberParameters extends PagedParameters {
    accountNumber?: number;
    name?: string;
}

export interface MemberResults extends PagedResults {
    members: Member[];
}