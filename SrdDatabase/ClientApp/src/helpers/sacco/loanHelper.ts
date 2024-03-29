﻿import { Loan } from "../../models/sacco/loan";
import { formattedDate } from "../miscellaneous";

export function describeLoan(loan: Loan, useAmount?: boolean, useDate?: boolean) {
    return `${loan.loanType} loan${useAmount ? ` for ${loan.principal?.toLocaleString()} UGX` : ''}${useDate ? ` (${formattedDate(loan.dateDisbursed)})` : ''}`;
}

export function describeLoanTerm(loan: Loan) {
    return `${loan.termMonths} months`;
}