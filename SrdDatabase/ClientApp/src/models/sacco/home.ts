import { DistributionResults } from "./distribution";
import { MemberResults } from "./member";
import { TransactionResults } from "./transaction";

export interface SaccoDetails {
    memberResults: MemberResults;
    transactionResults: TransactionResults;
    distributionResults: DistributionResults;
}