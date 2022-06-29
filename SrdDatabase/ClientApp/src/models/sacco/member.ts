import { PagedParameters, PagedResults } from "../shared";
import { DistributionAppliedResults } from "./distribution";
import { LoanResults } from "./loan";
import { TransactionResults } from "./transaction";
import { PaymentResults } from "./payment";

export interface Member {
    id?: number;
    accountNumber?: number;
    name?: string;
    isChurch?: boolean;
    dateJoined?: Date;
    autoFeesStartDate?: Date;
    yearsOfFees?: number;
    shares?: number;
    sharesValue?: number;
    savings?: number;
    balance?: number;
}

export interface MemberToSend extends Omit<Member, "dateJoined"> {
    dateJoined?: string;
}

export interface MemberDetails {
    member: Member;
    transactionResults: TransactionResults;
    distributionAppliedResults: DistributionAppliedResults;
    loanResults: LoanResults;
    paymentResults: PaymentResults;
}   

export interface MemberParameters extends PagedParameters {
    accountNumber?: number;
    name?: string;
    isChurch?: boolean;
}

export interface MemberResults extends PagedResults {
    members: Member[];
}