import { DetailsListItem } from "../../models/shared";
import { Member, MemberResults } from "../../models/sacco/member";
import { formattedDate } from "../miscellaneous";
import { TransactionResults } from "../../models/sacco/transaction";
import { describeTransaction } from "./transactionHelper";
import { LoanResults } from "../../models/sacco/loan";
import { describeLoan } from "./loanHelper";
import { DistributionAppliedResults, DistributionResults } from "../../models/sacco/distribution";
import { describeDistribution, describeDistributionApplied } from "./distributionHelper";
import { FineWindow, Installment, InstallmentResults } from "../../models/sacco/installment";

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

export function distributionItems(distributionResults: DistributionResults): DetailsListItem[] {
    return distributionResults.distributions.map(distribution => ({
        id: distribution.id,
        displayText: `${formattedDate(distribution.date)}: ${describeDistribution(distribution)}`,
    }));
}

export function distributionAppliedItems(distributionAppliedResults: DistributionAppliedResults): DetailsListItem[] {
    return distributionAppliedResults.distributionsApplied.map(distributionApplied => ({
        id: distributionApplied.distributionId,
        displayText: `${formattedDate(distributionApplied.date)}: ${describeDistributionApplied(distributionApplied)}`,
    }));
}

export function feeItems(member: Member): DetailsListItem[] {
    var yearsOfFees = member.yearsOfFees as number;
    const annualFee = 10000;
    const items = [];
    var date = new Date(member.autoFeesStartDate as Date);

    for (var i = 0; i < yearsOfFees; i++) {
        items.push({
            id: i,
            displayText: `${formattedDate(date)}: Membership fee of ${annualFee.toLocaleString()} UGX`,
        });

        date.setFullYear(date.getFullYear() + 1);
    }

    return items.sort((a, b) => b.id - a.id).slice(0, 10);
}

export function loanItems(loanResults: LoanResults, useAmount: boolean = false): DetailsListItem[] {
    return loanResults.loans.map(loan => ({
        id: loan.id,
        displayText: `${formattedDate(loan.dateDisbursed)}: ${describeLoan(loan, useAmount)}`,
    }));
}

export function installmentItems(installmentResults: InstallmentResults) {
    return installmentResults.installments.map(installment => ({
        id: installment.id,
        displayText: `${formattedDate(installment.isPaid ? installment.datePaid : installment.dateDue)}: ${installment.totalDue} UGX ${installment.isPaid ? 'paid' : 'due'}`
    }));
}

export function fineWindowItems(fineWindows: FineWindow[]) {
    const getEndDate = (index: number): string => {
        if (index === fineWindows.length - 1) {
            return 'or later';
        } else {
            var date = new Date(fineWindows[index + 1].startDate);
            date.setDate(date.getDate() - 1);
            return `to ${formattedDate(date)}`;
        }
    }

    return fineWindows.map((fineWindow, index) => ({
        id: index,
        displayText: `${formattedDate(fineWindow.startDate)} ${getEndDate(index)}: ${fineWindow.finePercentage}% fine (${fineWindow.fine.toLocaleString()} UGX) = ${fineWindow.totalDue.toLocaleString()} UGX total due`,
    }));
}