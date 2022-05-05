import { Transaction } from "../../models/sacco/transaction";
import { parenthesizeIfNegative } from "../miscellaneous";

export function describeTransaction(transaction: Transaction) {
    return `${transaction.isContribution ? 'Contribution to' : 'Withdrawal from'} ${describeTransactionType(transaction)}`;
}

export function describeTransactionAmount(transaction: Transaction) {
    const amount = transaction.isContribution ? transaction.amount : -(transaction.amount as number);
    return parenthesizeIfNegative(amount);
}

export function describeTransactionType(transaction: Transaction) {
    return transaction.isShares ? 'Shares' : 'Savings';
}