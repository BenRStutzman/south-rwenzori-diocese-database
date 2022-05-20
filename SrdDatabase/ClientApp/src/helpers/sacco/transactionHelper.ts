import { Transaction } from "../../models/sacco/transaction";
import { parenthesizeIfNegative } from "../miscellaneous";

export function describeTransaction(transaction: Transaction, useAccountNumber: boolean = false) {
    const amountString = transaction.amount?.toLocaleString();

    const description = transaction.isShares
        ? (transaction.isContribution
            ? `Purchase of ${amountString} shares`
            : `Sale of ${amountString} shares`)
        : (transaction.isContribution
            ? `Contribution of ${amountString} UGX`
            : `Withdrawal of ${amountString} UGX`)

    return `${useAccountNumber ? `[Account #${transaction.accountNumber}] ` : ''}${description}`;
}

export function describeTransactionAmount(transaction: Transaction) {
    const amount = transaction.isContribution ? transaction.amount : -(transaction.amount as number);
    return parenthesizeIfNegative(amount, transaction.isShares ? 'Shares' : 'UGX');
}

export function describeTransactionType(transaction: Transaction) {
    return transaction.isShares ? 'Shares' : 'Savings';
}