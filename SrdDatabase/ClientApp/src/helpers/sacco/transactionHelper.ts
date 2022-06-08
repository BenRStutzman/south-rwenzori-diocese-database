import { Transaction } from "../../models/sacco/transaction";
import { parenthesizeIfNegative } from "../miscellaneous";

export function describeTransaction(transaction: Transaction, useAccountNumber: boolean = false) {
    const amountString = transaction.amount?.toLocaleString();

    const description = transaction.isShares
        ? (transaction.isContribution
            ? `Purchase of ${amountString} share${(transaction.amount as number) > 1 ? 's' : ''}`
            : `Sale of ${amountString} share${(transaction.amount as number) > 1 ? 's' : ''}`)
        : (transaction.isContribution
            ? `Contribution of ${amountString} UGX`
            : `Withdrawal of ${amountString} UGX`)

    return `${useAccountNumber ? `[Account #${transaction.accountNumber}] ` : ''}${description}`;
}

export function describeTransactionAmount(transaction: Transaction) {
    const amount = transaction.isContribution ? transaction.amount : -(transaction.amount as number);
    return parenthesizeIfNegative(amount, transaction.isShares ? `Share${(transaction.amount as number) > 1 ? 's' : ''}` : 'UGX');
}

export function describeTransactionType(transaction: Transaction) {
    return transaction.isShares ? 'Shares' : 'Savings';
}