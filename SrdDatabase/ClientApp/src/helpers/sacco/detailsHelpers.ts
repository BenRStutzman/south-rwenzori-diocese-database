import { DetailsListItem } from "../../models/shared";
import { MemberResults } from "../../models/sacco/member";
import { formattedDate } from "../miscellaneous";
import { TransactionResults } from "../../models/sacco/transaction";
import { describeTransaction } from "./transactionHelper";
import { LoanResults } from "../../models/sacco/loan";
import { describeLoan } from "./loanHelper";

export function saccoMemberItems(memberResults: MemberResults): DetailsListItem[] {
    return memberResults.members.map(member => (
        { id: member.id, displayText: member.name }
    ));
}

export function transactionItems(transactionResults: TransactionResults): DetailsListItem[] {
    return transactionResults.transactions.map(transaction => ({
        id: transaction.id,
        displayText: `${formattedDate(transaction.date)}: ${describeTransaction(transaction)}`,
    }));
}

export function loanItems(loanResults: LoanResults, useAmount: boolean = false): DetailsListItem[] {
    return loanResults.loans.map(loan => ({
        id: loan.id,
        displayText: `${formattedDate(loan.date)}: ${describeLoan(loan, useAmount)}`,
    }));
}