import { Transaction } from "../../models/sacco/transaction";
import { parenthesizeIfNegative } from "../miscellaneous";

export function describeTransaction(transaction: Transaction, useAccountNumber: boolean = false) {
    const description = transaction.isShares
        ? (transaction.isContribution
            ? `Purchase of ${transaction.amount} shares`
            : `Sale of ${transaction.amount} shares`)
        : (transaction.isContribution
            ? `Contribution of ${transaction.amount} UGX`
            : `Withdrawal of ${transaction.amount} UGX`)

    return `${description}${useAccountNumber ? ` - Account #${transaction.accountNumber}` : ''}`;
}

export function describeTransactionAmount(transaction: Transaction) {
    const amount = transaction.isContribution ? transaction.amount : -(transaction.amount as number);
    return parenthesizeIfNegative(amount);
}

export function describeTransactionType(transaction: Transaction) {
    return transaction.isShares ? 'Shares' : 'Savings';
}