import { PagedParameters, PagedResults } from "../shared";
import { LoanResults } from "./loan";
import { TransactionResults } from "./transaction";

export interface Member {
    id?: number;
    name?: string;
}

export interface MemberDetails {
    member: Member;
    transactionResults: TransactionResults;
    loanResults: LoanResults;
}

export interface MemberParameters extends PagedParameters {
    id?: number;
    name?: string;
}

export interface MemberResults extends PagedResults {
    members: Member[];
}