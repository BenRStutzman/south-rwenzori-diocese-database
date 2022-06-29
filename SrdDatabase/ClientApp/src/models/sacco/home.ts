import { PaymentResults } from "./payment";
import { LoanResults } from "./loan";
import { MemberResults } from "./member";
import { TransactionResults } from "./transaction";

export interface SaccoDetails {
    memberResults: MemberResults;
    transactionResults: TransactionResults;
    loanResults: LoanResults;
    paymentResults: PaymentResults;
    shares: number;
    sharesValue: number;
    savings: number;
    balance: number;
    loanBalance: number;
}