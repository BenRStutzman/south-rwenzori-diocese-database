import { PaymentResults } from "../payment";
import { DistributionResults } from "./distribution";
import { LoanResults } from "./loan";
import { MemberResults } from "./member";
import { TransactionResults } from "./transaction";

export interface SaccoDetails {
    memberResults: MemberResults;
    transactionResults: TransactionResults;
    distributionResults: DistributionResults;
    loanResults: LoanResults;
    paymentResults: PaymentResults;
}