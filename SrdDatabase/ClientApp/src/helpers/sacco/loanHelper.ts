import { Loan } from "../../models/sacco/loan";

export function describeLoan(loan: Loan, useAmount?: boolean) {
    return `${loan.loanType} loan${useAmount ? ` for ${loan.principal} UGX` : ''}`;
}

export function describeLoanTerm(loan: Loan) {
    return `${loan.termMonths} months`;
}