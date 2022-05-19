import { DetailsListItem } from "../../models/shared";
import { Member, MemberResults } from "../../models/sacco/member";
import { formattedDate } from "../miscellaneous";
import { TransactionResults } from "../../models/sacco/transaction";
import { describeTransaction } from "./transactionHelper";
import { LoanResults } from "../../models/sacco/loan";
import { describeLoan } from "./loanHelper";
import { DividendAppliedResults, DividendResults } from "../../models/sacco/dividend";
import { describeDividend, describeDividendApplied } from "./dividendHelper";

export function memberItems(memberResults: MemberResults): DetailsListItem[] {
    return memberResults.members.map(member => (
        { id: member.id, displayText: member.name }
    ));
}

export function transactionItems(transactionResults: TransactionResults, useAccountNumber: boolean = false): DetailsListItem[] {
    return transactionResults.transactions.map(transaction => ({
        id: transaction.id,
        displayText: `${formattedDate(transaction.date)}: ${describeTransaction(transaction, useAccountNumber)}`,
    }));
}

export function dividendItems(dividendResults: DividendResults): DetailsListItem[] {
    return dividendResults.dividends.map(dividend => ({
        id: dividend.id,
        displayText: `${formattedDate(dividend.date)}: ${describeDividend(dividend)}`,
    }));
}

export function dividendAppliedItems(dividendAppliedResults: DividendAppliedResults): DetailsListItem[] {
    return dividendAppliedResults.dividendsApplied.map(dividendApplied => ({
        id: dividendApplied.dividendId,
        displayText: `${formattedDate(dividendApplied.date)}: ${describeDividendApplied(dividendApplied)}`,
    }));
}

export function feeItems(autoFeesStartDate: Date, yearsOfFees: number): DetailsListItem[] {
    const annualFee = 10000;
    const items = [];
    var date = autoFeesStartDate;

    for (var i = 0; i < yearsOfFees; i++) {
        items.push({
            id: i,
            displayText: `${formattedDate(date)}: Membership fee of ${annualFee.toLocaleString()} UGX`,
        });

        date.setFullYear(date.getFullYear() + 1);
    }

    return items;
}

export function loanItems(loanResults: LoanResults, useAmount: boolean = false): DetailsListItem[] {
    return loanResults.loans.map(loan => ({
        id: loan.id,
        displayText: `${formattedDate(loan.date)}: ${describeLoan(loan, useAmount)}`,
    }));
}