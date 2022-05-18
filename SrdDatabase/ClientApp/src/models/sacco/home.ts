import { DividendResults } from "./dividend";
import { MemberResults } from "./member";
import { TransactionResults } from "./transaction";

export interface SaccoDetails {
    memberResults: MemberResults;
    transactionResults: TransactionResults;
    dividendResults: DividendResults;
}