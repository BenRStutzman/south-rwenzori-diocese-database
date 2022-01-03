import { Transaction } from "../models/transaction";
import { parenthesize } from "./miscellaneous";

export function parenthesizeAmountIfPayment(transaction: Transaction) : string {
    return transaction.isPayment ? parenthesize(transaction.amount as number) : (transaction.amount as number).toString();
};