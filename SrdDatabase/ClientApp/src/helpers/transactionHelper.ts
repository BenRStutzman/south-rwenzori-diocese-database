import { Transaction } from "../models/transaction";
import { parenthesize } from "./miscellaneous";

export function parenthesizeAmountIfPayment(transaction: Transaction) : string {
    return transaction.isPayment ? parenthesize(transaction.amount as number) : (transaction.amount as number).toString();
};

export function describeTransaction(transaction: Transaction): string {
    return `${transaction.isPayment ? 'Payment from' : 'Charge to'} ${transaction.congregation} Congregation`;
}