import { Transaction } from "../../models/sacco/transaction";

export function describeTransaction(transaction: Transaction) {
    return `${transaction.isContribution ? 'Contribution' : 'Withdrawal'} of ${transaction.amount} UGX`
}